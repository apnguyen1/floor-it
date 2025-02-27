import { act, render, screen } from '@testing-library/react';
import Timer from './Timer.tsx';

const INITIAL_TIME = 30;

describe('Timer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const TimerProps = {
    inGame: true,
    onTimeOut: () => {},
    isActive: false,
    playerState: {
      name: 'Player 1',
      color: 'blue',
      time: INITIAL_TIME,
    },
  };

  const renderTimer = (overrides = {}) => {
    const props = { ...TimerProps, ...overrides };
    return render(<Timer {...props} />);
  };

  it('should render with initial time', () => {
    renderTimer();

    expect(screen.getByText(INITIAL_TIME)).toBeInTheDocument();
  });

  it('should not count down when game is not in progress', () => {
    renderTimer({ inGame: false, isActive: true });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // Time should still be at initial value
    expect(screen.getByText(INITIAL_TIME)).toBeInTheDocument();
  });

  it('should not count down when timer is not active', () => {
    renderTimer({ inGame: true, isActive: false });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // Time should still be at initial value
    expect(screen.getByText(INITIAL_TIME)).toBeInTheDocument();
  });

  it('should count down when game is in progress and timer is active', () => {
    renderTimer({ inGame: true, isActive: true });

    const secondsAdvanced = 5;
    act(() => {
      vi.advanceTimersByTime(secondsAdvanced * 1000); // 5 seconds
    });

    expect(screen.getByText(INITIAL_TIME - secondsAdvanced)).toBeInTheDocument();
  });

  it('should call onTimeOut when timer reaches zero', () => {
    const onTimeOutMock = vi.fn();
    renderTimer({ onTimeOut: onTimeOutMock, isActive: true });

    act(() => {
      vi.advanceTimersByTime(INITIAL_TIME * 1000);
    });

    expect(onTimeOutMock).toHaveBeenCalledWith('Player 1');
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should reset timer when game state changes to active', () => {
    const { rerender } = renderTimer({ inGame: false, isActive: false });

    // Now start the game
    rerender(<Timer {...TimerProps} />);

    expect(screen.getByText(INITIAL_TIME)).toBeInTheDocument();
  });
});
