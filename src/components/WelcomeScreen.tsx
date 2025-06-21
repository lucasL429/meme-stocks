
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Trophy, Zap, Target } from 'lucide-react';

interface WelcomeScreenProps {
  onStartGame: () => void;
}

const WelcomeScreen = ({ onStartGame }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-yellow-300 rounded-full animate-bounce opacity-70"></div>
        <div className="absolute top-20 right-10 w-16 h-16 bg-blue-300 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-300 rounded-full animate-ping opacity-70"></div>
        <div className="absolute bottom-10 right-20 w-14 h-14 bg-pink-300 rounded-full animate-bounce opacity-70"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Main Title */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-bounce drop-shadow-2xl">
            🚀 MemeStocks
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 mb-4 animate-pulse">
            EXCHANGE 🎮
          </h2>
          <p className="text-2xl md:text-3xl text-white mb-8 drop-shadow-lg font-bold">
            Trade the hottest memes and build your fortune! 💰
          </p>
          <div className="flex justify-center gap-4 text-3xl animate-bounce">
            <span>🐕</span> <span>🐸</span> <span>😭</span> <span>💪</span> <span>📈</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="bg-white/20 backdrop-blur-sm border-4 border-white/30 text-white transform hover:scale-110 transition-all duration-300 shadow-2xl">
            <CardHeader className="pb-3">
              <TrendingUp className="w-10 h-10 mx-auto text-green-400 mb-3 animate-pulse" />
              <CardTitle className="text-xl font-bold">⚡ Real-Time Trading</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-100 font-semibold">
                Watch prices go BRRRR and make epic investments! 📊
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
              <Target className="w-10 h-10 mx-auto text-red-400 mb-3 animate-ping" />
              <CardTitle className="text-xl font-bold">🎪 Live Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-100 font-semibold">
                Market crashes, surges, and pure chaos! 🔥
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Start Button */}
        <Button
          onClick={onStartGame}
          size="lg"
          className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:from-green-500 hover:via-blue-600 hover:to-purple-700 text-white text-2xl px-16 py-8 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 border-4 border-yellow-300 font-bold animate-pulse"
        >
          🎮 START TRADING NOW! 🚀
        </Button>

        {/* Instructions */}
        <div className="mt-12 text-white bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-4 border-white/30 shadow-2xl">
          <p className="text-2xl font-bold mb-2">💰 Starting Capital: $10,000</p>
          <p className="text-lg font-semibold">Buy low, sell high, and become the ultimate meme mogul! 🏆</p>
          <div className="flex justify-center gap-6 mt-4 text-lg">
            <span>📊 12+ Meme Categories</span>
            <span>⚡ 10 Upgrade Levels</span>
            <span>🏅 6 Achievements</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
