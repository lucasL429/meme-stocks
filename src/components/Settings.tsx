
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Palette, Globe, Bell, Save, BookOpen } from 'lucide-react';

export interface GameSettings {
  language: string;
  darkMode: boolean;
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
    const newSettings = {
      ...settings,
      [key]: value
    };
    onSettingsChange(newSettings);
    
    // Apply settings immediately
    if (key === 'darkMode') {
      document.documentElement.classList.toggle('dark', value);
    }
    
    // Save to localStorage for persistence
    localStorage.setItem('memeStocksSettings', JSON.stringify(newSettings));
  };

  const getLanguageText = (key: string) => {
    const translations: { [key: string]: { [lang: string]: string } } = {
      'settings': {
        'en': '⚙️ Game Settings',
        'es': '⚙️ Configuración del Juego',
        'fr': '⚙️ Paramètres du Jeu',
        'de': '⚙️ Spieleinstellungen',
        'pt': '⚙️ Configurações do Jogo',
        'ja': '⚙️ ゲーム設定'
      },
      'tutorial': {
        'en': '🎓 Open Tutorial - Learn How to Play!',
        'es': '🎓 Abrir Tutorial - ¡Aprende a Jugar!',
        'fr': '🎓 Ouvrir le Tutoriel - Apprenez à Jouer!',
        'de': '🎓 Tutorial Öffnen - Lerne zu Spielen!',
        'pt': '🎓 Abrir Tutorial - Aprenda a Jogar!',
        'ja': '🎓 チュートリアルを開く - プレイ方法を学ぶ！'
      },
      'saveClose': {
        'en': '✅ Save & Close',
        'es': '✅ Guardar y Cerrar',
        'fr': '✅ Sauvegarder et Fermer',
        'de': '✅ Speichern und Schließen',
        'pt': '✅ Salvar e Fechar',
        'ja': '✅ 保存して閉じる'
      }
    };
    return translations[key]?.[settings.language] || translations[key]?.['en'] || key;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            {getLanguageText('settings')}
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
                {getLanguageText('tutorial')}
              </Button>
              <p className="text-sm text-gray-600 mt-2 text-center">
                Review the basics of meme trading and investment strategies
              </p>
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
              {getLanguageText('saveClose')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
