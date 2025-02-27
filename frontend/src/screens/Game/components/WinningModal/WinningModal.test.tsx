import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import WinningModal from './WinningModal';
import { PlayerState } from '../../../../types/global.type.ts';
import { useApp } from '../../../../hooks/useApp.ts';

vi.mock('../../../../hooks/useApp.ts', async () => {
  const actual = await vi.importActual('../../../../hooks/useApp');
  return {
    ...actual,
    useApp: vi.fn(),
  };
});

// Mock the react-confetti component
vi.mock('react-confetti', () => ({
  default: vi.fn(() => <div data-testid="mock-confetti" />),
}));

// Mock the useWindowSize hook
vi.mock('react-use/lib/useWindowSize', () => ({
  default: vi.fn(() => ({ width: 1024, height: 768 })),
}));

describe('WinningModal', () => {
  const mockSetScreen = vi.fn();
  const mockOnClose = vi.fn();

  const mockWinner: PlayerState = {
    name: 'Test Winner',
    color: '#3288BD',
    time: 30,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useApp).mockReturnValue({
      setUseSharedTimer: vi.fn(),
      updateBothPlayers: vi.fn(),
      updatePlayerOne: vi.fn(),
      updatePlayerTwo: vi.fn(),
      useSharedTimer: false,
      setScreen: mockSetScreen,
      screen: 'game',
      players: {
        P1: { name: 'Player 1', color: '#D53E4F', time: 30 },
        P2: { name: 'Player 2', color: '#3288BD', time: 30 },
      },
      selectedCategory: [],
      setSelectedCategory: vi.fn(),
      setPlayers: vi.fn(),
    });
  });

  it('should not render when winner is undefined', () => {
    render(<WinningModal isOpen={true} winner={undefined} onClose={mockOnClose} />);

    // Modal should not be present in the document
    expect(screen.queryByText('Congratulations!')).not.toBeInTheDocument();
  });

  it('should render the winner name and confetti when open', () => {
    render(<WinningModal isOpen={true} winner={mockWinner} onClose={mockOnClose} />);

    // Check that the winner's name is displayed
    expect(screen.getByText('Test Winner Wins!')).toBeInTheDocument();
    expect(screen.getByText('Congratulations!')).toBeInTheDocument();

    // Check that confetti is displayed
    expect(screen.getByTestId('mock-confetti')).toBeInTheDocument();
  });

  it('should not render when isOpen is false', () => {
    render(<WinningModal isOpen={false} winner={mockWinner} onClose={mockOnClose} />);

    // Modal should not be visible
    expect(screen.queryByText('Congratulations!')).not.toBeInTheDocument();
  });

  it('should navigate to Categories screen when Play Again is clicked', () => {
    render(<WinningModal isOpen={true} winner={mockWinner} onClose={mockOnClose} />);

    // Click the Play Again button
    fireEvent.click(screen.getByText('Play Again'));

    // Check that onClose was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
