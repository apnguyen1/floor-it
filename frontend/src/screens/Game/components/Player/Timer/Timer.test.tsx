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

  it('should render with initial time', () => {
    render(
      <Timer
        inGame={true}
        onTimeOut={() => {}}
        isActive={false}
        playerName="Player 1"
        playerColor={'black'}
      />,
    );

    expect(screen.getByText(INITIAL_TIME)).toBeInTheDocument();
  });

  it('should not count down when game is not in progress', () => {
    render(
      <Timer
        inGame={false}
        onTimeOut={() => {}}
        isActive={true}
        playerName="Player 1"
        playerColor={'black'}
      />,
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // Time should still be at initial value
    expect(screen.getByText(INITIAL_TIME)).toBeInTheDocument();
  });

  it('should not count down when timer is not active', () => {
    render(
      <Timer
        inGame={true}
        onTimeOut={() => {}}
        isActive={false}
        playerName="Player 1"
        playerColor={'black'}
      />,
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // Time should still be at initial value
    expect(screen.getByText(INITIAL_TIME)).toBeInTheDocument();
  });

  it('should count down when game is in progress and timer is active', () => {
    render(
      <Timer
        inGame={true}
        onTimeOut={() => {}}
        isActive={true}
        playerName="Player 1"
        playerColor={'black'}
      />,
    );

    const secondsAdvanced = 5;
    act(() => {
      vi.advanceTimersByTime(secondsAdvanced * 1000); // 5 seconds
    });

    expect(screen.getByText(INITIAL_TIME - secondsAdvanced)).toBeInTheDocument();
  });

  it('should call onTimeOut when timer reaches zero', () => {
    const onTimeOutMock = vi.fn();
    render(
      <Timer
        inGame={true}
        onTimeOut={onTimeOutMock}
        isActive={true}
        playerName="Player 1"
        playerColor={'black'}
      />,
    );

    // complete timeout
    act(() => {
      vi.advanceTimersByTime(INITIAL_TIME * 1000);
    });

    expect(onTimeOutMock).toHaveBeenCalledWith('Player 1');
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should reset timer when game state changes to active', () => {
    const { rerender } = render(
      <Timer
        inGame={false}
        onTimeOut={() => {}}
        isActive={false}
        playerName="Player 1"
        playerColor={'black'}
      />,
    );

    // Now start the game
    rerender(
      <Timer
        inGame={true}
        onTimeOut={() => {}}
        isActive={false}
        playerName="Player 1"
        playerColor={'black'}
      />,
    );

    // Timer should be reset to initial value
    expect(screen.getByText(INITIAL_TIME)).toBeInTheDocument();
  });
});
