import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GameScreen } from './GameScreen';
import { useCategoryQuestions } from '../../hooks/useCategoryQuestions';
import { useSpeechCommands } from '../../hooks/useSpeechCommands';
import { useApp } from '../../hooks/useApp';
import SpeechRecognition from 'react-speech-recognition';
import { ScreenType } from '../../constants/screens';
import { CategoryContent, Question } from './GameScreen.type';
import { PlayerState } from '../../types/global.type.ts';

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

vi.mock('react-confetti', () => ({
  default: vi.fn(() => <div data-testid="mock-confetti" />),
}));

beforeAll(() => {
  window.HTMLMediaElement.prototype.play = vi.fn(() => Promise.resolve());
  window.HTMLMediaElement.prototype.pause = vi.fn();
});

vi.mock('./components/WinningModal//WinningModal', () => ({
  default: vi.fn(({ isOpen, winner, onClose }) =>
    isOpen ? (
      <div data-testid="mock-winning-modal">
        {winner?.name} wins
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
  ),
}));

interface PlayerPropsMock {
  isActive: boolean;
  onTimeOut: (playerName: string) => void;
  playerState: PlayerState;
}

vi.mock('./components/Player/Player', () => ({
  Player: ({ playerState, isActive, onTimeOut }: PlayerPropsMock) => (
    <div
      data-testid={`player-${playerState.name}`}
      className={isActive ? 'active' : 'inactive'}
    >
      <button
        onClick={() => onTimeOut(playerState.name)}
        data-testid={`timeout-${playerState.name}`}
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
  const mockGetCategoryProgress = vi.fn().mockReturnValue({ current: 1, total: 3 });

  beforeEach(() => {
    vi.clearAllMocks();

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    (useApp as any).mockReturnValue({
      players: mockPlayers,
      selectedCategory: ['Movies'],
      setScreen: mockSetScreen,
    });

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    (useCategoryQuestions as any).mockReturnValue({
      category: mockCategory,
      currentQuestion: mockQuestion,
      skipQuestion: mockSkipQuestion,
      setNextQuestion: mockSetNextQuestion,
      getCategoryProgress: mockGetCategoryProgress,
    });

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    (useSpeechCommands as any).mockReturnValue({
      transcript: 'test transcript',
      listening: true,
      hasError: false,
      errorMessage: undefined,
    });

    window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
    window.HTMLMediaElement.prototype.pause = vi.fn();
  });

  it('should render the game screen with correct initial state', () => {
    render(<GameScreen />);

    expect(screen.getByTestId('player-Player1')).toBeInTheDocument();
    expect(screen.getByTestId('player-Player2')).toBeInTheDocument();

    expect(screen.getByTestId('display')).toBeInTheDocument();
    expect(screen.getByTestId('game-status')).toHaveTextContent('Not In Game');

    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('should start the game when start button is clicked', async () => {
    const user = userEvent.setup();
    render(<GameScreen />);

    await user.click(screen.getByTestId('start-game'));

    expect(screen.getByTestId('game-status')).toHaveTextContent('In Game');
    expect(SpeechRecognition.startListening).toHaveBeenCalledTimes(1);
  });

  it('should handle player timeout correctly', async () => {
    const user = userEvent.setup();
    render(<GameScreen />);

    // Ensure your test has proper mocks for any SpeechRecognition functionality
    vi.mocked(SpeechRecognition.abortListening).mockClear();

    await user.click(screen.getByTestId('start-game'));
    await user.click(screen.getByTestId('timeout-Player1'));

    expect(screen.getByTestId('game-status')).toHaveTextContent('Not In Game');
    expect(SpeechRecognition.abortListening).toHaveBeenCalledTimes(1);

    // Check that the winning modal appears
    expect(screen.getByTestId('mock-winning-modal')).toBeInTheDocument();
  });

  it('should navigate back to category screen when back button is clicked', async () => {
    const user = userEvent.setup();
    render(<GameScreen />);

    await user.click(screen.getByText('Back'));

    expect(mockSetScreen).toHaveBeenCalledWith(ScreenType.Categories);
    expect(SpeechRecognition.abortListening).toHaveBeenCalledTimes(1);
  });

  it('should alternate active player when a correct answer is given', () => {
    render(<GameScreen />);

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const correctAnswerCallback = (useSpeechCommands as any).mock.calls[0][2];

    correctAnswerCallback();
    expect(mockSetNextQuestion).toHaveBeenCalledTimes(1);
  });
});
