import { Box, Tooltip } from '@mui/material';
import { categoryCircle, indicatorContainer } from './Points.style.ts';

interface PointsProps {
  /**
   * Total number of categories selected
   */
  totalCategories: number;

  /**
   * Current category index (0-based)
   */
  currentCategoryIndex: number;

  /**
   * Player 1's color
   */
  player1Color: string;

  /**
   * Player 2's color
   */
  player2Color: string;

  /**
   * Array tracking which player won each category
   * 0 = not played, 1 = player 1 won, 2 = player 2 won
   */
  categoryWins: number[];
}

/**
 * Simple component that displays circles above a player's avatar
 * representing the number of selected categories
 */
export const Points = ({
  totalCategories,
  currentCategoryIndex,
  player1Color,
  player2Color,
  categoryWins,
}: PointsProps) => {
  if (totalCategories <= 1) return null;
  return (
    <Box sx={indicatorContainer()}>
      {Array.from({ length: totalCategories }).map((_, index) => {
        // Determine the state of this category
        const isCurrent = index === currentCategoryIndex;
        const player1Won = categoryWins[index] === 1;
        const player2Won = categoryWins[index] === 2;

        const circleColor = player1Won
          ? player1Color
          : player2Won
            ? player2Color
            : '#999';

        const tooltipText = player1Won
          ? 'Player 1 won'
          : player2Won
            ? 'Player 2 won'
            : isCurrent
              ? 'Current category'
              : 'Upcoming category';

        return (
          <Tooltip key={index} title={tooltipText} arrow>
            <Box
              sx={categoryCircle(circleColor, isCurrent, player1Won || player2Won)}
            />
          </Tooltip>
        );
      })}
    </Box>
  );
};
