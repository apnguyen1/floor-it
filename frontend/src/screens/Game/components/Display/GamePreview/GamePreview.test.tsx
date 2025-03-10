import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CategoryContent } from '../../../GameScreen.type.ts';
import { GamePreview } from './GamePreview.tsx';

describe('GamePreview', () => {
  const mockCategory: CategoryContent = {
    name: 'World Geography',
    preview_img: 'geography.jpg',
    preview_desc: 'Test your knowledge of countries and capitals!',
    type: 'text',
    questions: [],
  };

  const mockStartGame = vi.fn();
  const mockSkipCategory = vi.fn();
  const mockCategoryProgress = { current: 1, total: 3 };

  it('should render category name correctly', () => {
    render(<GamePreview category={mockCategory} onStartGame={mockStartGame} />);

    expect(screen.getByText('World Geography')).toBeInTheDocument();
  });

  it('should render category description correctly', () => {
    render(<GamePreview category={mockCategory} onStartGame={mockStartGame} />);

    expect(
      screen.getByText('Test your knowledge of countries and capitals!'),
    ).toBeInTheDocument();
  });

  it('should render preview image with correct src', () => {
    render(<GamePreview category={mockCategory} onStartGame={mockStartGame} />);

    const image = screen.getByAltText('Category Preview');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'previews/geography.jpg');
  });

  it('should render Start Game button', () => {
    render(<GamePreview category={mockCategory} onStartGame={mockStartGame} />);

    const button = screen.getByRole('button', { name: /play game!/i });
    expect(button).toBeInTheDocument();
  });

  it('should call onStartGame when button is clicked', () => {
    render(<GamePreview category={mockCategory} onStartGame={mockStartGame} />);

    const button = screen.getByRole('button', { name: /play game!/i });
    fireEvent.click(button);

    expect(mockStartGame).toHaveBeenCalledTimes(1);
  });

  it('should render Skip Category button when not on last category', () => {
    render(
      <GamePreview
        category={mockCategory}
        onStartGame={mockStartGame}
        onSkipCategory={mockSkipCategory}
        categoryProgress={mockCategoryProgress}
      />,
    );

    const skipButton = screen.getByRole('button', { name: /skip to next category/i });
    expect(skipButton).toBeInTheDocument();
  });

  it('should not render Skip Category button on last category', () => {
    render(
      <GamePreview
        category={mockCategory}
        onStartGame={mockStartGame}
        onSkipCategory={mockSkipCategory}
        categoryProgress={{ current: 3, total: 3 }}
      />,
    );

    const skipButtons = screen.queryAllByRole('button', {
      name: /skip to next category/i,
    });
    expect(skipButtons.length).toBe(0);
  });

  it('should call onSkipCategory when skip button is clicked', () => {
    render(
      <GamePreview
        category={mockCategory}
        onStartGame={mockStartGame}
        onSkipCategory={mockSkipCategory}
        categoryProgress={mockCategoryProgress}
      />,
    );

    const skipButton = screen.getByRole('button', { name: /skip to next category/i });
    fireEvent.click(skipButton);

    expect(mockSkipCategory).toHaveBeenCalledTimes(1);
  });

  it('should handle different category data correctly', () => {
    const differentCategory: CategoryContent = {
      name: 'Famous Movies',
      preview_img: 'movies.jpg',
      preview_desc: 'Test your cinema knowledge!',
      type: 'img',
      questions: [],
    };

    const { rerender } = render(
      <GamePreview category={mockCategory} onStartGame={mockStartGame} />,
    );

    expect(screen.getByText('World Geography')).toBeInTheDocument();

    rerender(<GamePreview category={differentCategory} onStartGame={mockStartGame} />);

    expect(screen.getByText('Famous Movies')).toBeInTheDocument();
    expect(screen.getByText('Test your cinema knowledge!')).toBeInTheDocument();

    const image = screen.getByAltText('Category Preview');
    expect(image).toHaveAttribute('src', 'previews/movies.jpg');
  });
});
