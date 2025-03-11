import { Box, Tooltip } from '@mui/material';
import { categoryCircle, indicatorContainer } from './Points.style.ts';
import { PlayerState } from '../../types/global.type.ts';

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
   * The Players
   */
  players: { P1: PlayerState; P2: PlayerState };

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
  players,
  categoryWins,
}: PointsProps) => {
  if (totalCategories <= 1) return null;
  return (
    <Box sx={indicatorContainer()}>
      {Array.from({ length: totalCategories }).map((_, index) => {
        const isCurrent = index === currentCategoryIndex;
        const isUpcoming = index > currentCategoryIndex;
        const isCompleted = index < currentCategoryIndex;
        const player1Won = categoryWins[index] === 1;
        const player2Won = categoryWins[index] === 2;

        let tooltipText = '';
        if (player1Won) {
          tooltipText = `${players.P1.name} won!`;
        } else if (player2Won) {
          tooltipText = `${players.P2.name} won!`;
        } else if (isCurrent) {
          tooltipText = 'Current category';
        } else if (isUpcoming) {
          tooltipText = 'Upcoming category';
        } else {
          tooltipText = 'Category not completed';
        }

        return (
          <Tooltip key={index} title={tooltipText} arrow>
            <Box
              sx={categoryCircle(
                player1Won ? players.P1.color : player2Won ? players.P2.color : '#999',
                isCurrent,
                isUpcoming,
                isCompleted,
                player1Won || player2Won,
              )}
            />
          </Tooltip>
        );
      })}
    </Box>
  );
};
