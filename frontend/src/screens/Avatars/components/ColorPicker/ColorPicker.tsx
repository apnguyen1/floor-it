import React, { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { Palette } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import {
  checkmarkIcon,
  colorMenuContainer,
  colorMenuItem,
  colorPickerButton,
} from './ColorPicker.style';

// Color options array
const COLOR_OPTIONS = [
  '#9E0142',
  '#D53E4F', // P1's default color
  '#F46D43',
  '#FDAE61',
  '#FEE08B',
  '#E6F598',
  '#ABDDA4',
  '#66C2A5',
  '#3288BD', // P2's default color
  '#5E4FA2',
];

interface ColorPickerProps {
  selectedColor: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
  allSelectedColors: string[];
}

/**
 * ColorPicker component allows users to select a color from a predefined palette
 *
 * @param selectedColor - Currently selected color
 * @param setSelectedColor - Function to update the selected color
 * @param allSelectedColors - All colors currently selected (to prevent duplicates)
 */
const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  setSelectedColor,
  allSelectedColors,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorSelect = (color: string) => {
    // Only update if not disabled
    if (!allSelectedColors.includes(color) || color === selectedColor) {
      setSelectedColor(color);
      handleClose();
    }
  };

  return (
    <Box>
      <Tooltip title="Select Color">
        <IconButton onClick={handleClick} sx={colorPickerButton()}>
          <Palette />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <Box sx={colorMenuContainer()}>
          {COLOR_OPTIONS.map((color) => {
            const isDisabled =
              allSelectedColors.includes(color) && color !== selectedColor;
            const isSelected = color === selectedColor;

            return (
              <MenuItem
                key={color}
                onClick={() => handleColorSelect(color)}
                sx={colorMenuItem(color, isDisabled, isSelected)}
                disabled={isDisabled}
              >
                {isSelected && <CheckIcon sx={checkmarkIcon()} />}
              </MenuItem>
            );
          })}
        </Box>
      </Menu>
    </Box>
  );
};

export default ColorPicker;
