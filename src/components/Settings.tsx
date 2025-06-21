
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Settings as SettingsIcon, Volume2, VolumeX, Moon, Sun, Globe, Palette, Music } from 'lucide-react';

export interface GameSettings {
  language: string;
  darkMode: boolean;
  musicEnabled: boolean;
  soundEffectsEnabled: boolean;
  musicVolume: number;
  sfxVolume: number;
  colorTheme: string;
  notifications: boolean;
  autoSave: boolean;
}

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
}

const Settings = ({ isOpen, onClose, settings, onSettingsChange }: SettingsProps) => {
  const [tempSettings, setTempSettings] = useState<GameSettings>(settings);

  useEffect(() => {
    setTempSettings(settings);
  }, [settings]);

  const handleSave = () => {
    onSettingsChange(tempSettings);
    onClose();
  };

  const handleReset = () => {
    const defaultSettings: GameSettings = {
      language: 'en',
      darkMode: false,
      musicEnabled: true,
      soundEffectsEnabled: true,
      musicVolume: 70,
      sfxVolume: 80,
      colorTheme: 'rainbow',
      notifications: true,
      autoSave: true
    };
    setTempSettings(defaultSettings);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-50 to-pink-50 border-4 border-purple-300 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <SettingsIcon className="w-8 h-8 animate-spin" />
            🎮 Game Settings
            <Badge className="bg-white/30 text-white border-white/50">v1.0</Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Language Settings */}
          <div className="bg-white/50 rounded-xl p-4 border-2 border-purple-200">
            <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              🌍 Language & Region
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Language:</span>
                <Select 
                  value={tempSettings.language} 
                  onValueChange={(value) => setTempSettings({...tempSettings, language: value})}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">🇺🇸 English</SelectItem>
                    <SelectItem value="es">🇪🇸 Español</SelectItem>
                    <SelectItem value="fr">🇫🇷 Français</SelectItem>
                    <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                    <SelectItem value="ja">🇯🇵 日本語</SelectItem>
                    <SelectItem value="ko">🇰🇷 한국어</SelectItem>
                    <SelectItem value="zh">🇨🇳 中文</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="bg-white/50 rounded-xl p-4 border-2 border-purple-200">
            <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5" />
              🎨 Theme & Appearance
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold flex items-center gap-2">
                  {tempSettings.darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  Dark Mode:
                </span>
                <Switch 
                  checked={tempSettings.darkMode}
                  onCheckedChange={(checked) => setTempSettings({...tempSettings, darkMode: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-semibold">Color Theme:</span>
                <Select 
                  value={tempSettings.colorTheme} 
                  onValueChange={(value) => setTempSettings({...tempSettings, colorTheme: value})}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rainbow">🌈 Rainbow</SelectItem>
                    <SelectItem value="neon">✨ Neon</SelectItem>
                    <SelectItem value="pastel">🦄 Pastel</SelectItem>
                    <SelectItem value="retro">📼 Retro</SelectItem>
                    <SelectItem value="cyberpunk">🤖 Cyberpunk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Audio Settings */}
          <div className="bg-white/50 rounded-xl p-4 border-2 border-purple-200">
            <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
              <Music className="w-5 h-5" />
              🔊 Audio Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold flex items-center gap-2">
                  🎵 Background Music:
                </span>
                <Switch 
                  checked={tempSettings.musicEnabled}
                  onCheckedChange={(checked) => setTempSettings({...tempSettings, musicEnabled: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-semibold flex items-center gap-2">
                  🔊 Sound Effects:
                </span>
                <Switch 
                  checked={tempSettings.soundEffectsEnabled}
                  onCheckedChange={(checked) => setTempSettings({...tempSettings, soundEffectsEnabled: checked})}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">🎵 Music Volume:</span>
                  <span className="text-purple-600 font-bold">{tempSettings.musicVolume}%</span>
                </div>
                <Slider
                  value={[tempSettings.musicVolume]}
                  onValueChange={(value) => setTempSettings({...tempSettings, musicVolume: value[0]})}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">🔊 SFX Volume:</span>
                  <span className="text-purple-600 font-bold">{tempSettings.sfxVolume}%</span>
                </div>
                <Slider
                  value={[tempSettings.sfxVolume]}
                  onValueChange={(value) => setTempSettings({...tempSettings, sfxVolume: value[0]})}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Game Settings */}
          <div className="bg-white/50 rounded-xl p-4 border-2 border-purple-200">
            <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
              🎮 Gameplay
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">🔔 Notifications:</span>
                <Switch 
                  checked={tempSettings.notifications}
                  onCheckedChange={(checked) => setTempSettings({...tempSettings, notifications: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-semibold">💾 Auto-Save:</span>
                <Switch 
                  checked={tempSettings.autoSave}
                  onCheckedChange={(checked) => setTempSettings({...tempSettings, autoSave: checked})}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3"
            >
              💾 Save Settings
            </Button>
            <Button 
              onClick={handleReset}
              variant="outline"
              className="flex-1 border-2 border-orange-400 text-orange-600 hover:bg-orange-50 font-bold py-3"
            >
              🔄 Reset to Default
            </Button>
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1 border-2 border-gray-400 text-gray-600 hover:bg-gray-50 font-bold py-3"
            >
              ❌ Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
