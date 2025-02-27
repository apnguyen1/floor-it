import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GameStatus } from '../../GameScreen.type.ts';
import { Player, PlayerProps } from './Player.tsx';

interface MockProps {
  inGame: boolean;
  isActive: boolean;
  playerName: string;
}

// Mock the Timer component
vi.mock('./Timer/Timer.tsx', () => ({
  default: ({ inGame, isActive, playerName }: MockProps) => (
    <div data-testid="timer-mock">
      Timer: inGame={String(inGame)}, isActive={String(isActive)}, playerName=
      {playerName}
    </div>
  ),
}));

describe('Player', () => {
  const mockOnTimeOut = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps: PlayerProps = {
    playerState: {
      name: 'John Doe',
      color: 'blue',
      time: 30,
    },
    gameStatus: {
      inGame: false,
      winner: undefined,
      activePlayer: false,
    },
    onTimeOut: mockOnTimeOut,
    isActive: false,
    listening: false,
  };

  const renderPlayer = (overrides: Partial<PlayerProps>) => {
    const props = { ...defaultProps, ...overrides };
    return render(<Player {...props} />);
  };

  it('should render player name and avatar', () => {
    renderPlayer({ playerState: { ...defaultProps.playerState, name: 'John Doe' } });

    expect(screen.getByText('JD')).toBeInTheDocument();

    const timerElement = screen.getByTestId('timer-mock');
    expect(timerElement).toHaveTextContent('inGame=false');
    expect(timerElement).toHaveTextContent('isActive=false');
  });

  it('should handle short names correctly', () => {
    renderPlayer({ playerState: { ...defaultProps.playerState, name: 'Jo' } });

    // Check avatar abbreviation is rendered correctly for short names
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('should show "You will start!" message when game not started and player is active', () => {
    renderPlayer({
      gameStatus: { ...defaultProps.gameStatus, activePlayer: true },
      isActive: true,
    });

    expect(screen.getByText('You will start!')).toBeInTheDocument();
  });

  it('should show active player turn status with mic on', () => {
    const gameStatus: GameStatus = {
      inGame: true,
      winner: undefined,
      activePlayer: true,
    };

    renderPlayer({ gameStatus, isActive: true, listening: true });

    expect(screen.getByText("John's Turn")).toBeInTheDocument();

    const micOffElement = document.querySelector('[data-testid="MicOffIcon"]');
    expect(micOffElement).toBeNull();
  });

  it('should show active player turn status with mic off', () => {
    const gameStatus: GameStatus = {
      inGame: true,
      winner: undefined,
      activePlayer: true,
    };

    renderPlayer({ gameStatus, isActive: true, listening: false });

    expect(screen.getByText("John's Turn")).toBeInTheDocument();
    const micElement = document.querySelector('[data-testid="MicIcon"]');
    expect(micElement).toBeNull();
  });

  it('should display winner status when player wins', () => {
    const gameStatus: GameStatus = {
      inGame: true,
      winner: 'John Doe',
      activePlayer: false,
    };

    renderPlayer({ gameStatus });

    expect(screen.getByText('Winner!')).toBeInTheDocument();
  });

  it('should display "Time\'s up!" when another player wins', () => {
    const gameStatus: GameStatus = {
      inGame: true,
      winner: 'Jane Doe',
      activePlayer: false,
    };

    renderPlayer({ gameStatus });

    expect(screen.getByText("Time's up!")).toBeInTheDocument();
  });

  it('should display nothing for inactive players when game is in progress', () => {
    const gameStatus: GameStatus = {
      inGame: true,
      winner: undefined,
      activePlayer: false,
    };

    renderPlayer({ gameStatus: { ...gameStatus, inGame: true } });

    expect(screen.queryByText("John's Turn")).not.toBeInTheDocument();
    expect(screen.queryByText('Winner!')).not.toBeInTheDocument();
    expect(screen.queryByText("Time's up!")).not.toBeInTheDocument();
    expect(screen.queryByText('You will start!')).not.toBeInTheDocument();
  });

  it('should pass the correct onTimeOut function to Timer', () => {
    const gameStatus: GameStatus = {
      inGame: true,
      winner: undefined,
      activePlayer: true,
    };

    renderPlayer({ gameStatus, isActive: true });

    const timerElement = screen.getByTestId('timer-mock');
    expect(timerElement).toBeInTheDocument();
  });

  it('should handle spaces in player names correctly', () => {
    const gameStatus: GameStatus = {
      inGame: true,
      winner: undefined,
      activePlayer: true,
    };

    renderPlayer({
      playerState: {
        ...defaultProps.playerState,
        name: 'John James Doe',
      },
      gameStatus,
      isActive: true,
      listening: false,
    });

    expect(screen.getByText("John's Turn")).toBeInTheDocument();
    expect(screen.getByText('JJD')).toBeInTheDocument();
  });
});
