
import { useEffect, useRef } from 'react';
import type { GameSettings } from './Settings';

interface AudioManagerProps {
  settings: GameSettings;
}

const AudioManager = ({ settings }: AudioManagerProps) => {
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const audioContext = useRef<{ [key: string]: HTMLAudioElement }>({});

  // Sound effect functions
  const playSound = (soundType: string, volume: number = 0.5) => {
    if (!settings.soundEffectsEnabled) return;
    
    try {
      // Create audio element if it doesn't exist
      if (!audioContext.current[soundType]) {
        audioContext.current[soundType] = new Audio();
        
        // Set sound sources based on type (using data URIs for simple beeps)
        switch (soundType) {
          case 'buy':
            // Positive buying sound
            audioContext.current[soundType].src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvGETBjuBzvLiXg==';
            break;
          case 'sell':
            // Selling sound
            audioContext.current[soundType].src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvGETBjuBzvLVaA==';
            break;
          case 'upgrade':
            // Upgrade purchase sound
            audioContext.current[soundType].src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvGETBjuBzvLhYg==';
            break;
          case 'notification':
            // Event notification sound
            audioContext.current[soundType].src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvGETBjuBzvLWag==';
            break;
          case 'error':
            // Error sound
            audioContext.current[soundType].src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvGETBjuBzvLTZA==';
            break;
          case 'achievement':
            // Achievement sound
            audioContext.current[soundType].src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvGETBjuBzvLUaQ==';
            break;
        }
      }
      
      const audio = audioContext.current[soundType];
      audio.volume = (volume * settings.sfxVolume) / 100;
      audio.currentTime = 0;
      audio.play().catch(() => {}); // Ignore autoplay restrictions
    } catch (error) {
      console.log('Audio playback failed:', error);
    }
  };

  // Background music management
  useEffect(() => {
    if (settings.musicEnabled) {
      if (!backgroundMusicRef.current) {
        backgroundMusicRef.current = new Audio();
        // Using a simple loop-able background track (you can replace with actual music)
        backgroundMusicRef.current.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvGETBjuBzvLiVg==';
        backgroundMusicRef.current.loop = true;
      }
      
      backgroundMusicRef.current.volume = settings.musicVolume / 100;
      backgroundMusicRef.current.play().catch(() => {}); // Ignore autoplay restrictions
    } else {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
      }
    }
  }, [settings.musicEnabled, settings.musicVolume]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
      }
      Object.values(audioContext.current).forEach(audio => {
        audio.pause();
      });
    };
  }, []);

  // Expose playSound function globally for other components
  useEffect(() => {
    (window as any).playGameSound = playSound;
  }, [settings.soundEffectsEnabled, settings.sfxVolume]);

  return null; // This component doesn't render anything
};

export default AudioManager;
