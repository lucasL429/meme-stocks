
import { useEffect, useRef } from 'react';
import type { GameSettings } from './Settings';

interface AudioManagerProps {
  settings: GameSettings;
}

const AudioManager = ({ settings }: AudioManagerProps) => {
  // Audio manager is now disabled - no sound functionality
  
  // Remove the global playGameSound function
  useEffect(() => {
    (window as any).playGameSound = () => {}; // Empty function to prevent errors
  }, []);

  return null; // This component doesn't render anything and is now inactive
};

export default AudioManager;
