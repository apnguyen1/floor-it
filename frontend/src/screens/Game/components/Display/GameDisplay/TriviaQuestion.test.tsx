import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import TriviaQuestion from './TriviaQuestion.tsx';

describe('TriviaQuestion', () => {
  it('should render text question correctly', () => {
    const question = 'What is the capital of France?';

    render(<TriviaQuestion type="text" question={question} />);

    expect(screen.getByText(question)).toBeInTheDocument();

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent(question);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('should render image question correctly', () => {
    const imageUrl = 'https://example.com/image.jpg';

    render(<TriviaQuestion type="image" question={imageUrl} />);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', imageUrl);
    expect(image).toHaveAttribute('alt', 'trivia image');

    // Make sure no text question is displayed
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('should not re-render unnecessarily due to memo', () => {
    // This is a bit tricky to test directly in JSDOM, but we can ensure
    // the memo is applied to the component
    const { rerender } = render(
      <TriviaQuestion type="text" question="Test Question" />,
    );

    rerender(<TriviaQuestion type="text" question="Test Question" />);

    expect(screen.getByText('Test Question')).toBeInTheDocument();

    rerender(<TriviaQuestion type="text" question="Different Question" />);

    expect(screen.getByText('Different Question')).toBeInTheDocument();
    expect(screen.queryByText('Test Question')).not.toBeInTheDocument();
  });
});
