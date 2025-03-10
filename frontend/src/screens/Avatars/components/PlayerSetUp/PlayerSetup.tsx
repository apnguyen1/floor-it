import React from 'react';
import { Avatar, Box, TextField } from '@mui/material';
import { playerAvatar, playerBox, playerNameField } from './PlayerSetup.style';
import ColorPicker from '../ColorPicker/ColorPicker.tsx';
import { getAvatarInitials } from '../../../../utils/avatarInitials.ts';

interface PlayerSetupProps {
  playerName: string;
  playerColor: string;
  defaultPlayerName: string;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onColorChange: React.Dispatch<React.SetStateAction<string>>;
  otherPlayerColor: string;
}

/**
 * PlayerSetup component for configuring an individual player's name and color
 *
 * @param playerName - Current player name
 * @param playerColor - Current player color
 * @param defaultPlayerName - Default player name (used for avatar initials if name is
 *   empty)
 * @param onNameChange - Function to handle name change
 * @param onColorChange - Function to handle color change
 * @param otherPlayerColor - The other player's selected color (to prevent duplicates)
 */
export const PlayerSetup: React.FC<PlayerSetupProps> = ({
  playerName,
  playerColor,
  defaultPlayerName,
  onNameChange,
  onColorChange,
  otherPlayerColor,
}) => {
  return (
    <Box sx={playerBox(playerColor)}>
      <Avatar sx={playerAvatar(playerColor)}>
        {getAvatarInitials(playerName, defaultPlayerName)}
      </Avatar>

      <TextField
        placeholder={defaultPlayerName}
        variant="outlined"
        value={playerName}
        onChange={onNameChange}
        fullWidth
        sx={playerNameField()}
        slotProps={{ htmlInput: { maxLength: 12 } }}
      />

      <ColorPicker
        selectedColor={playerColor}
        setSelectedColor={onColorChange}
        allSelectedColors={[otherPlayerColor]}
      />
    </Box>
  );
};
