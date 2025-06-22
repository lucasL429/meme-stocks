
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { X, Volume2, VolumeX, Moon, Sun } from 'lucide-react';

export interface GameSettings {
  language: string;
  darkMode: boolean;
  colorTheme: string;
  notifications: boolean;
  autoSave: boolean;
  volume: number;
  muted: boolean;
}

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
  onShowTutorial: () => void;
}

const Settings = ({ isOpen, onClose, settings, onSettingsChange, onShowTutorial }: SettingsProps) => {
  const updateSetting = (key: keyof GameSettings, value: any) => {
    const newSettings = {
      ...settings,
      [key]: value
    };
    onSettingsChange(newSettings);
    
    // Apply settings immediately
    if (key === 'darkMode') {
      document.documentElement.classList.toggle('dark', value);
      if (value) {
        document.body.style.backgroundColor = '#1f2937';
      } else {
        document.body.style.backgroundColor = '';
      }
    }
    
    // Save to localStorage for persistence
    localStorage.setItem('memeStocksSettings', JSON.stringify(newSettings));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">⚙️ Settings</h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Audio Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5" />
                  🎵 Audio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    {settings.muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    Mute
                  </Label>
                  <Switch
                    checked={settings.muted}
                    onCheckedChange={(checked) => updateSetting('muted', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Volume: {settings.volume}%</Label>
                  <Slider
                    value={[settings.volume]}
                    onValueChange={(value) => updateSetting('volume', value[0])}
                    max={100}
                    min={0}
                    step={5}
                    disabled={settings.muted}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {settings.darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  🎨 Appearance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    {settings.darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    {settings.darkMode ? 'Dark Mode' : 'Light Mode'}
                  </Label>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => updateSetting('darkMode', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tutorial Button */}
            <Card>
              <CardContent className="pt-6">
                <Button
                  onClick={() => {
                    onClose();
                    onShowTutorial();
                  }}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  📚 Open Tutorial
                </Button>
              </CardContent>
            </Card>

            {/* Close Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={onClose}
                className="bg-green-500 hover:bg-green-600 text-white px-8"
              >
                ✅ Save & Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
