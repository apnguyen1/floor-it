import { useState } from 'react';
import { PlayerState } from '../../types/global.type.ts';
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Modal,
  Slider,
  Switch,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TimerIcon from '@mui/icons-material/Timer';
import {
  actionButtonContainer,
  closeButtonStyle,
  playerSettingBox,
  sectionTitle,
  settingHeader,
  settingModalBox,
  settingSection,
  sliderContainer,
  timerValueDisplay,
} from './SettingModal.style.ts';

/**
 * Props for the SettingModal component.
 */
interface SettingModalProps {
  /** Whether the modal is currently visible */
  isOpen: boolean;
  /** Callback function to close the modal */
  onClose: () => void;
  /** Player settings */
  players: {
    P1: PlayerState;
    P2: PlayerState;
  };
  /** Current shared timer state */
  useSharedTimer: boolean;
  /** Callback function when settings are saved */
  onSave: (
    players: { P1: PlayerState; P2: PlayerState },
    useSharedTimer: boolean,
    useTextInput: boolean,
  ) => void;
  /** Current use text input state */
  useTextInput: boolean;
  /** Whether there is an error trying to use speech recognition or not */
  isSpeechError: boolean;
}

export const SettingModal = ({
  isOpen,
  onClose,
  players,
  useSharedTimer: initialUseSharedTimer,
  useTextInput,
  onSave,
  isSpeechError,
}: SettingModalProps) => {
  const [playerSettings, setPlayerSettings] = useState({ ...players });
  const [sharedTimer, setSharedTimer] = useState(initialUseSharedTimer);
  const [sharedTimerValue, setSharedTimerValue] = useState(playerSettings.P1.time);
  const [localUseTextInput, setLocalUseTextInput] = useState(useTextInput);

  /**
   * Handle timer change for an individual player
   *
   * @param player - The player identifier (P1 or P2)
   * @param value - The new timer value in seconds
   */
  const handlePlayerTimerChange = (player: 'P1' | 'P2', value: number) => {
    setPlayerSettings({
      ...playerSettings,
      [player]: {
        ...playerSettings[player],
        time: value,
      },
    });
  };

  /**
   * Handle change for the shared timer
   *
   * @param value - The new timer value in seconds
   */
  const handleSharedTimerChange = (value: number) => {
    setSharedTimerValue(value);
  };

  /**
   * Handle save button click
   */
  const handleSave = () => {
    // If using shared timer, update both players' timers to the shared value
    const updatedPlayers = sharedTimer
      ? {
          P1: { ...playerSettings.P1, time: sharedTimerValue },
          P2: { ...playerSettings.P2, time: sharedTimerValue },
        }
      : playerSettings;

    onSave(updatedPlayers, sharedTimer, localUseTextInput);
    onClose();
  };

  /**
   * Handle reset button click
   */
  const handleReset = () => {
    setPlayerSettings({
      P1: { ...players.P1, time: 30 },
      P2: { ...players.P2, time: 30 },
    });
    setSharedTimer(true);
    setSharedTimerValue(30);
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="settings-modal-title">
      <Box sx={settingModalBox()}>
        <IconButton aria-label="close" onClick={onClose} sx={closeButtonStyle()}>
          <CloseIcon />
        </IconButton>

        <Typography
          id="settings-modal-title"
          variant="h5"
          component="h2"
          sx={settingHeader()}
        >
          Game Settings
        </Typography>

        <Box sx={settingSection()}>
          <Typography variant="h6" sx={sectionTitle()}>
            Timer Settings
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={sharedTimer}
                onChange={(e) => setSharedTimer(e.target.checked)}
                color="primary"
              />
            }
            label="Use shared timer for both players"
          />

          {sharedTimer ? (
            <Box sx={sliderContainer()}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TimerIcon color="primary" />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  Timer Duration:
                  <Box component="span" sx={timerValueDisplay()}>
                    {sharedTimerValue}s
                  </Box>
                </Typography>
              </Box>
              <Slider
                value={sharedTimerValue}
                onChange={(_, value) => handleSharedTimerChange(value as number)}
                aria-labelledby="shared-timer-slider"
                valueLabelDisplay="auto"
                step={5}
                marks
                min={5}
                max={120}
              />
            </Box>
          ) : (
            <>
              <Box sx={playerSettingBox(playerSettings.P1.color)}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {playerSettings.P1.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TimerIcon color="primary" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    Timer Duration:
                    <Box component="span" sx={timerValueDisplay()}>
                      {playerSettings.P1.time}s
                    </Box>
                  </Typography>
                </Box>
                <Slider
                  value={playerSettings.P1.time}
                  onChange={(_, value) =>
                    handlePlayerTimerChange('P1', value as number)
                  }
                  aria-labelledby="p1-timer-slider"
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={5}
                  max={120}
                />
              </Box>

              <Box sx={playerSettingBox(playerSettings.P2.color)}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {playerSettings.P2.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TimerIcon color="primary" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    Timer Duration:
                    <Box component="span" sx={timerValueDisplay()}>
                      {playerSettings.P2.time}s
                    </Box>
                  </Typography>
                </Box>
                <Slider
                  value={playerSettings.P2.time}
                  onChange={(_, value) =>
                    handlePlayerTimerChange('P2', value as number)
                  }
                  aria-labelledby="p2-timer-slider"
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={5}
                  max={120}
                />
              </Box>
            </>
          )}

          {!isSpeechError && (
            <FormControlLabel
              control={
                <Switch
                  checked={localUseTextInput}
                  onChange={(e) => setLocalUseTextInput(e.target.checked)}
                />
              }
              label="Enable Text Input (in addition to voice)"
            />
          )}
        </Box>

        <Box sx={actionButtonContainer()}>
          <Button variant="outlined" onClick={handleReset}>
            Reset to Default
          </Button>
          <Button variant="contained" onClick={handleSave} color="primary">
            Save Settings
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
