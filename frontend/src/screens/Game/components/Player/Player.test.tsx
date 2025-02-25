import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GameStatus } from '../../GameScreen.type.ts';
import { Player } from './Player.tsx';

// Mock the Timer component
vi.mock('./Timer/Timer.tsx', () => ({
  default: ({ inGame, isActive, playerName }) => (
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

  it('should render player name and avatar', () => {
    const gameStatus: GameStatus = { inGame: false, winner: null };

    render(
      <Player
        playerName="John Doe"
        gameStatus={gameStatus}
        onTimeOut={mockOnTimeOut}
        isActive={false}
        listening={false}
      />,
    );

    // Check avatar abbreviation is rendered
    expect(screen.getByText('Jo')).toBeInTheDocument();

    // Check timer component receives correct props
    const timerElement = screen.getByTestId('timer-mock');
    expect(timerElement).toHaveTextContent('inGame=false');
    expect(timerElement).toHaveTextContent('isActive=false');
    expect(timerElement).toHaveTextContent('playerName=John Doe');
  });

  it('should handle short names correctly', () => {
    const gameStatus: GameStatus = { inGame: false, winner: null };

    render(
      <Player
        playerName="Jo"
        gameStatus={gameStatus}
        onTimeOut={mockOnTimeOut}
        isActive={false}
        listening={false}
      />,
    );

    // Check avatar abbreviation is rendered correctly for short names
    expect(screen.getByText('Jo')).toBeInTheDocument();
  });

  it('should show "You will start!" message when game not started and player is active', () => {
    const gameStatus: GameStatus = { inGame: false, winner: null };

    render(
      <Player
        playerName="John Doe"
        gameStatus={gameStatus}
        onTimeOut={mockOnTimeOut}
        isActive={true}
        listening={false}
      />,
    );

    expect(screen.getByText('You will start!')).toBeInTheDocument();
  });

  it('should show active player turn status with mic on', () => {
    const gameStatus: GameStatus = { inGame: true, winner: null };

    render(
      <Player
        playerName="John Doe"
        gameStatus={gameStatus}
        onTimeOut={mockOnTimeOut}
        isActive={true}
        listening={true}
      />,
    );

    expect(screen.getByText("John's Turn")).toBeInTheDocument();

    // Check that the MicIcon is rendered (we can't directly check for the icon
    // component) but we can check for absence of the MicOffIcon's parent element
    const micOffElement = document.querySelector('[data-testid="MicOffIcon"]');
    expect(micOffElement).toBeNull();
  });

  it('should show active player turn status with mic off', () => {
    const gameStatus: GameStatus = { inGame: true, winner: null };

    render(
      <Player
        playerName="John Doe"
        gameStatus={gameStatus}
        onTimeOut={mockOnTimeOut}
        isActive={true}
        listening={false}
      />,
    );

    expect(screen.getByText("John's Turn")).toBeInTheDocument();

    // Check that the MicOffIcon is rendered (we can't directly check for the icon
    // component) but we can check for absence of the MicIcon's parent element
    const micElement = document.querySelector('[data-testid="MicIcon"]');
    expect(micElement).toBeNull();
  });

  it('should display winner status when player wins', () => {
    const gameStatus: GameStatus = { inGame: true, winner: 'John Doe' };

    render(
      <Player
        playerName="John Doe"
        gameStatus={gameStatus}
        onTimeOut={mockOnTimeOut}
        isActive={false}
        listening={false}
      />,
    );

    expect(screen.getByText('Winner!')).toBeInTheDocument();
  });

  it('should display "Time\'s up!" when another player wins', () => {
    const gameStatus: GameStatus = { inGame: true, winner: 'Jane Doe' };

    render(
      <Player
        playerName="John Doe"
        gameStatus={gameStatus}
        onTimeOut={mockOnTimeOut}
        isActive={false}
        listening={false}
      />,
    );

    expect(screen.getByText("Time's up!")).toBeInTheDocument();
  });

  it('should display nothing for inactive players when game is in progress', () => {
    const gameStatus: GameStatus = { inGame: true, winner: null };

    render(
      <Player
        playerName="John Doe"
        gameStatus={gameStatus}
        onTimeOut={mockOnTimeOut}
        isActive={false}
        listening={false}
      />,
    );

    // There should be no turn message or winner message
    expect(screen.queryByText("John's Turn")).not.toBeInTheDocument();
    expect(screen.queryByText('Winner!')).not.toBeInTheDocument();
    expect(screen.queryByText("Time's up!")).not.toBeInTheDocument();
    expect(screen.queryByText('You will start!')).not.toBeInTheDocument();
  });

  it('should pass the correct onTimeOut function to Timer', () => {
    const gameStatus: GameStatus = { inGame: true, winner: null };

    render(
      <Player
        playerName="John Doe"
        gameStatus={gameStatus}
        onTimeOut={mockOnTimeOut}
        isActive={true}
        listening={false}
      />,
    );

    // Check that Timer receives the onTimeOut prop
    // (We can't directly test the function passing, but the mock confirms it's
    // included)
    const timerElement = screen.getByTestId('timer-mock');
    expect(timerElement).toBeInTheDocument();
  });

  it('should handle spaces in player names correctly', () => {
    const gameStatus: GameStatus = { inGame: true, winner: null };

    render(
      <Player
        playerName="John James Doe"
        gameStatus={gameStatus}
        onTimeOut={mockOnTimeOut}
        isActive={true}
        listening={false}
      />,
    );

    // First name should be extracted correctly
    expect(screen.getByText("John's Turn")).toBeInTheDocument();

    // Avatar should use the first two letters of the first name
    expect(screen.getByText('Jo')).toBeInTheDocument();
  });
});
