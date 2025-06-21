
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Trophy, Zap, Target, BookOpen } from 'lucide-react';

interface WelcomeScreenProps {
  onStartGame: () => void;
  onShowTutorial: () => void;
}

const WelcomeScreen = ({ onStartGame, onShowTutorial }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 via-blue-500 via-green-500 to-yellow-500 flex items-center justify-center p-4 relative overflow-hidden animate-pulse">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
        <div className="absolute top-20 right-10 w-16 h-16 bg-blue-400 rounded-full animate-pulse opacity-80"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-400 rounded-full animate-ping opacity-80"></div>
        <div className="absolute bottom-10 right-20 w-14 h-14 bg-pink-400 rounded-full animate-bounce opacity-80"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-purple-400 rounded-full animate-spin opacity-70"></div>
        <div className="absolute top-1/3 right-1/3 w-10 h-10 bg-red-400 rounded-full animate-pulse opacity-70"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Main Title */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-bounce drop-shadow-2xl">
            🚀 MemeStocks
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 mb-4 animate-pulse">
            EXCHANGE 🎮
          </h2>
          <p className="text-2xl md:text-3xl text-white mb-4 drop-shadow-lg font-bold">
            Trade viral TikTok memes and build your fortune! 📱💰
          </p>
          <p className="text-lg md:text-xl text-yellow-200 mb-8 drop-shadow-lg font-semibold">
            Learn real investment strategies through gamified meme trading!
          </p>
          <div className="flex justify-center gap-4 text-3xl animate-bounce">
            <span>📱</span> <span>🎯</span> <span>💎</span> <span>🚀</span> <span>📈</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="bg-white/20 backdrop-blur-sm border-4 border-white/30 text-white transform hover:scale-110 transition-all duration-300 shadow-2xl">
            <CardHeader className="pb-3">
              <TrendingUp className="w-10 h-10 mx-auto text-green-400 mb-3 animate-pulse" />
              <CardTitle className="text-xl font-bold">📱 TikTok Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-100 font-semibold">
                Trade memes based on real TikTok trending data! 📊
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/20 backdrop-blur-sm border-4 border-white/30 text-white transform hover:scale-110 transition-all duration-300 shadow-2xl">
            <CardHeader className="pb-3">
              <Zap className="w-10 h-10 mx-auto text-yellow-400 mb-3 animate-bounce" />
              <CardTitle className="text-xl font-bold">🛒 Power-Ups Shop</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-100 font-semibold">
                Unlock 10 levels of INSANE upgrades! ⚡
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/20 backdrop-blur-sm border-4 border-white/30 text-white transform hover:scale-110 transition-all duration-300 shadow-2xl">
            <CardHeader className="pb-3">
              <Trophy className="w-10 h-10 mx-auto text-purple-400 mb-3 animate-spin" />
              <CardTitle className="text-xl font-bold">🏅 Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-100 font-semibold">
                Earn rewards and become a meme legend! 👑
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/20 backdrop-blur-sm border-4 border-white/30 text-white transform hover:scale-110 transition-all duration-300 shadow-2xl">
            <CardHeader className="pb-3">
              <BookOpen className="w-10 h-10 mx-auto text-cyan-400 mb-3 animate-pulse" />
              <CardTitle className="text-xl font-bold">📚 Educational</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-100 font-semibold">
                Learn real investment principles! 🧠
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Button
            onClick={onShowTutorial}
            size="lg"
            className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 hover:from-blue-500 hover:via-purple-600 hover:to-pink-700 text-white text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 border-4 border-cyan-300 font-bold animate-pulse"
          >
            📚 LEARN HOW TO PLAY 🎓
          </Button>

          <Button
            onClick={onStartGame}
            size="lg"
            className="bg-gradient-to-r from-green-400 via-yellow-500 to-orange-600 hover:from-green-500 hover:via-yellow-600 hover:to-orange-700 text-white text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 border-4 border-yellow-300 font-bold animate-bounce"
          >
            🎮 START TRADING NOW! 🚀
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-white bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-4 border-white/30 shadow-2xl">
          <p className="text-2xl font-bold mb-2">💰 Starting Capital: $10,000</p>
          <p className="text-lg font-semibold mb-4">Trade TikTok viral content and become the ultimate meme mogul! 🏆</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-bold">
            <span className="bg-white/20 rounded-lg p-2">📱 12+ TikTok Categories</span>
            <span className="bg-white/20 rounded-lg p-2">⚡ 10 Upgrade Levels</span>
            <span className="bg-white/20 rounded-lg p-2">🏅 6 Achievements</span>
            <span className="bg-white/20 rounded-lg p-2">📚 Educational Content</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
