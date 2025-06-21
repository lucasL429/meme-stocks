
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Volume2, VolumeX, Moon, Sun, Palette, Globe, Bell, Save, BookOpen } from 'lucide-react';

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
  onShowTutorial: () => void;
}

const Settings = ({ isOpen, onClose, settings, onSettingsChange, onShowTutorial }: SettingsProps) => {
  const updateSetting = (key: keyof GameSettings, value: any) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            ⚙️ Game Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Tutorial Section */}
          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <BookOpen className="w-5 h-5" />
                📚 Tutorial & Help
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => {
                  onClose();
                  onShowTutorial();
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold"
              >
                🎓 Open Tutorial - Learn How to Play!
              </Button>
              <p className="text-sm text-gray-600 mt-2 text-center">
                Review the basics of meme trading and investment strategies
              </p>
            </CardContent>
          </Card>

          {/* Audio Settings */}
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-green-600" />
                🔊 Audio Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  🎵 Background Music
                </Label>
                <Switch
                  checked={settings.musicEnabled}
                  onCheckedChange={(checked) => updateSetting('musicEnabled', checked)}
                />
              </div>

              {settings.musicEnabled && (
                <div className="space-y-2">
                  <Label className="text-sm">Music Volume: {settings.musicVolume}%</Label>
                  <Slider
                    value={[settings.musicVolume]}
                    onValueChange={([value]) => updateSetting('musicVolume', value)}
                    max={100}
                    step={10}
                    className="w-full"
                  />
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  🔊 Sound Effects
                </Label>
                <Switch
                  checked={settings.soundEffectsEnabled}
                  onCheckedChange={(checked) => updateSetting('soundEffectsEnabled', checked)}
                />
              </div>

              {settings.soundEffectsEnabled && (
                <div className="space-y-2">
                  <Label className="text-sm">SFX Volume: {settings.sfxVolume}%</Label>
                  <Slider
                    value={[settings.sfxVolume]}
                    onValueChange={([value]) => updateSetting('sfxVolume', value)}
                    max={100}
                    step={10}
                    className="w-full"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card className="border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-600" />
                🎨 Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  {settings.darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  🌙 Dark Mode
                </Label>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => updateSetting('darkMode', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label>🌈 Color Theme</Label>
                <Select value={settings.colorTheme} onValueChange={(value) => updateSetting('colorTheme', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rainbow">🌈 Rainbow (Default)</SelectItem>
                    <SelectItem value="neon">⚡ Neon</SelectItem>
                    <SelectItem value="pastel">🎀 Pastel</SelectItem>
                    <SelectItem value="retro">📼 Retro</SelectItem>
                    <SelectItem value="classic">🎯 Classic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <Card className="border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-600" />
                🌍 Language & Region
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Language</Label>
                <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">🇺🇸 English</SelectItem>
                    <SelectItem value="es">🇪🇸 Español</SelectItem>
                    <SelectItem value="fr">🇫🇷 Français</SelectItem>
                    <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                    <SelectItem value="pt">🇧🇷 Português</SelectItem>
                    <SelectItem value="ja">🇯🇵 日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Gameplay Settings */}
          <Card className="border-2 border-pink-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-pink-600" />
                🎮 Gameplay
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  🔔 Event Notifications
                </Label>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => updateSetting('notifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  💾 Auto-Save Progress
                </Label>
                <Switch
                  checked={settings.autoSave}
                  onCheckedChange={(checked) => updateSetting('autoSave', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Educational Info */}
          <Card className="border-2 border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="text-2xl">🎓📚</div>
                <h3 className="font-bold text-cyan-800">Educational Gaming</h3>
                <p className="text-sm text-cyan-700">
                  MemeStocks Exchange teaches real investment principles through gamified trading. 
                  Learn about market volatility, diversification, and risk management!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Close Button */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold px-8 py-2"
            >
              ✅ Save & Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
