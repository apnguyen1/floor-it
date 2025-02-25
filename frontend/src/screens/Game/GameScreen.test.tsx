import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GameScreen } from './GameScreen';
import { useCategoryQuestions } from '../../hooks/useCategoryQuestions';
import { useSpeechCommands } from '../../hooks/useSpeechCommands';
import { useApp } from '../../hooks/useApp';
import SpeechRecognition from 'react-speech-recognition';
import { ScreenType } from '../../constants/screens';
import { CategoryContent, Question } from './GameScreen.type';
import { Mock } from 'vitest';

// Mock the custom hooks and external dependencies
vi.mock('../../hooks/useApp', () => ({
  useApp: vi.fn(),
}));

vi.mock('../../hooks/useCategoryQuestions', () => ({
  useCategoryQuestions: vi.fn(),
}));

vi.mock('../../hooks/useSpeechCommands', () => ({
  useSpeechCommands: vi.fn(),
}));

vi.mock('react-speech-recognition', () => ({
  default: {
    startListening: vi.fn().mockResolvedValue(undefined),
    abortListening: vi.fn().mockResolvedValue(undefined),
  },
}));

interface PlayerPropsMock {
  playerName: string;
  isActive: boolean;
  onTimeOut: (playerName: string) => void;
}

vi.mock('./components/Player/Player', () => ({
  Player: ({ playerName, isActive, onTimeOut }: PlayerPropsMock) => (
    <div
      data-testid={`player-${playerName}`}
      className={isActive ? 'active' : 'inactive'}
    >
      <button
        onClick={() => onTimeOut(playerName)}
        data-testid={`timeout-${playerName}`}
      >
        Timeout
      </button>
    </div>
  ),
}));

interface DisplayPropsMock {
  inGame: boolean;
  onStartGame: () => void;
  transcript: string;
}

vi.mock('./components/Display/Display', () => ({
  Display: ({ inGame, onStartGame, transcript }: DisplayPropsMock) => (
    <div data-testid="display">
      <div data-testid="game-status">{inGame ? 'In Game' : 'Not In Game'}</div>
      <div data-testid="transcript">{transcript}</div>
      <button onClick={onStartGame} data-testid="start-game">
        Start Game
      </button>
    </div>
  ),
}));

describe('GameScreen', () => {
  // Setup for all tests
  const mockPlayers = {
    P1: { name: 'Player1' },
    P2: { name: 'Player2' },
  };

  const mockCategory: CategoryContent = {
    name: 'Movies',
    preview_img: '/images/movies.jpg',
    preview_desc: 'Test your movie knowledge',
    type: 'text',
    questions: [
      {
        question: 'What is the highest-grossing film of all time?',
        answers: ['Avatar', 'Avengers: Endgame'],
        aliases: [],
      },
    ],
  };

  const mockQuestion: Question = {
    question: 'What is the highest-grossing film of all time?',
    answers: ['Avatar', 'Avengers: Endgame'],
    aliases: [],
  };

  const mockSetScreen = vi.fn();
  const mockSkipQuestion = vi.fn();
  const mockSetNextQuestion = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock implementation of useApp with proper typing
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    (useApp as any).mockReturnValue({
      players: mockPlayers,
      selectedCategory: ['Movies'],
      setScreen: mockSetScreen,
    });

    // Mock implementation of useCategoryQuestions with proper typing
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    (useCategoryQuestions as any).mockReturnValue({
      category: mockCategory,
      currentQuestion: mockQuestion,
      skipQuestion: mockSkipQuestion,
      setNextQuestion: mockSetNextQuestion,
    });

    // Mock implementation of useSpeechCommands with proper typing
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    (useSpeechCommands as any).mockReturnValue({
      transcript: 'test transcript',
      listening: true,
      hasError: false,
      errorMessage: undefined,
    });

    // Mock HTMLAudioElement
    window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
    window.HTMLMediaElement.prototype.pause = vi.fn();
  });

  it('should render the game screen with correct initial state', () => {
    render(<GameScreen />);

    // Check for players
    expect(screen.getByTestId('player-Player1')).toBeInTheDocument();
    expect(screen.getByTestId('player-Player2')).toBeInTheDocument();

    // Check display component
    expect(screen.getByTestId('display')).toBeInTheDocument();
    expect(screen.getByTestId('game-status')).toHaveTextContent('Not In Game');

    // Check for back button
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('should start the game when start button is clicked', async () => {
    const user = userEvent.setup();
    render(<GameScreen />);

    // Start the game
    await user.click(screen.getByTestId('start-game'));

    // Check if the game state has changed
    expect(screen.getByTestId('game-status')).toHaveTextContent('In Game');
    expect(SpeechRecognition.startListening).toHaveBeenCalledTimes(1);
  });

  it('should handle player timeout correctly', async () => {
    const user = userEvent.setup();
    render(<GameScreen />);

    // Start the game first
    await user.click(screen.getByTestId('start-game'));

    // Trigger timeout for Player1
    await user.click(screen.getByTestId('timeout-Player1'));

    // Game should stop and Player2 should be declared the winner
    expect(screen.getByTestId('game-status')).toHaveTextContent('Not In Game');
    expect(SpeechRecognition.abortListening).toHaveBeenCalledTimes(1);
  });

  it('should navigate back to category screen when back button is clicked', async () => {
    const user = userEvent.setup();
    render(<GameScreen />);

    // Click the back button
    await user.click(screen.getByText('Back'));

    // Should navigate to category screen
    expect(mockSetScreen).toHaveBeenCalledWith(ScreenType.Categories);
    expect(SpeechRecognition.abortListening).toHaveBeenCalledTimes(1);
  });

  it('should alternate active player when a correct answer is given', () => {
    render(<GameScreen />);

    const correctAnswerCallback = (useSpeechCommands as unknown as Mock).mock
      .calls[0][2];

    correctAnswerCallback();
    expect(mockSetNextQuestion).toHaveBeenCalledTimes(1);
  });
});
