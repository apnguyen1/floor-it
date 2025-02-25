import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CategoryContent } from '../../../GameScreen.type.ts';
import { GamePreview } from './GamePreview.tsx';

describe('GamePreview', () => {
  const mockCategory: CategoryContent = {
    id: 'geography',
    name: 'World Geography',
    preview_img: 'geography.jpg',
    preview_desc: 'Test your knowledge of countries and capitals!',
    type: 'text',
    questions: [],
  };

  const mockStartGame = vi.fn();

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

    const button = screen.getByRole('button', { name: /start game/i });
    expect(button).toBeInTheDocument();
  });

  it('should call onStartGame when button is clicked', () => {
    render(<GamePreview category={mockCategory} onStartGame={mockStartGame} />);

    const button = screen.getByRole('button', { name: /start game/i });
    fireEvent.click(button);

    expect(mockStartGame).toHaveBeenCalledTimes(1);
  });

  it('should handle different category data correctly', () => {
    const differentCategory: CategoryContent = {
      id: 'movies',
      name: 'Famous Movies',
      preview_img: 'movies.jpg',
      preview_desc: 'Test your cinema knowledge!',
      type: 'image',
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
