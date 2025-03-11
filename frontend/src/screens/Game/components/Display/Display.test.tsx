import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Display } from './Display';
import { CategoryContent, Question } from '../../GameScreen.type.ts';

vi.mock('./GameDisplay/TriviaQuestion', () => ({
  default: ({ question }: { question: Question }) => (
    <div data-testid="trivia-question">{question.question}</div>
  ),
}));

vi.mock('./GamePreview/GamePreview', () => ({
  GamePreview: ({
    category,
    onStartGame,
  }: {
    category: CategoryContent;
    onStartGame: () => void;
  }) => (
    <div data-testid="game-preview" onClick={onStartGame}>
      {category.type}
    </div>
  ),
}));

describe('Display', () => {
  const mockQuestion: Question = {
    question: 'What is the highest-grossing film of all time?',
    answers: ['Avatar', 'Avengers: Endgame'],
    aliases: [],
  };

  const mockCategory: CategoryContent = {
    type: 'text',
    name: 'Movie',
    preview_img: 'default-preview.png',
    preview_desc: 'Test your Movie Knowledege',
    questions: [mockQuestion],
  };

  const mockProps = {
    category: mockCategory,
    currentQuestion: mockQuestion,
    inGame: false,
    onStartGame: vi.fn(),
    transcript: '',
    hasError: false,
    errorMessage: '',
    isSkipped: false,
    useTextInput: false,
    onTextSubmit: vi.fn(),
    handleTextInputFocus: vi.fn(),
    handleTextInputBlur: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state when category or question is undefined', () => {
    render(<Display {...mockProps} category={undefined} currentQuestion={undefined} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render error message when hasError is true', () => {
    const errorMessage = 'Something went wrong!';
    render(
      <Display
        {...mockProps}
        inGame={true}
        hasError={true}
        errorMessage={errorMessage}
      />,
    );
    screen.debug();
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(
      screen.getByText(errorMessage + ' Defaulting to text input.'),
    ).toBeInTheDocument();
  });

  it('should render GamePreview when not in game', () => {
    render(<Display {...mockProps} inGame={false} />);

    expect(screen.getByTestId('game-preview')).toBeInTheDocument();
    expect(screen.queryByTestId('trivia-question')).not.toBeInTheDocument();
  });

  it('should render TriviaQuestion and transcript when in game', () => {
    const transcript = 'test transcript';
    render(<Display {...mockProps} inGame={true} transcript={transcript} />);

    expect(screen.getByTestId('trivia-question')).toBeInTheDocument();
    expect(screen.getByText(`You said:`)).toBeInTheDocument();
  });

  it('should call onStartGame when GamePreview is clicked', async () => {
    const user = userEvent.setup();
    render(<Display {...mockProps} inGame={false} />);

    await user.click(screen.getByTestId('game-preview'));
    expect(mockProps.onStartGame).toHaveBeenCalledTimes(1);
  });
});
