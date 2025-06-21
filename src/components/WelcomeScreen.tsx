
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Trophy, Zap, Target } from 'lucide-react';

interface WelcomeScreenProps {
  onStartGame: () => void;
}

const WelcomeScreen = ({ onStartGame }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Title */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 animate-fade-in">
            🚀 MemeStocks
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
            EXCHANGE
          </h2>
          <p className="text-xl md:text-2xl text-blue-200 mb-8">
            Trade the hottest memes and build your fortune!
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="pb-3">
              <TrendingUp className="w-8 h-8 mx-auto text-green-400 mb-2" />
              <CardTitle className="text-lg">Real-Time Trading</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-200">
                Watch prices fluctuate and make strategic investments
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="pb-3">
              <Zap className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
              <CardTitle className="text-lg">Power-Ups</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-200">
                Unlock upgrades with 10 levels of enhancement
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="pb-3">
              <Trophy className="w-8 h-8 mx-auto text-purple-400 mb-2" />
              <CardTitle className="text-lg">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-200">
                Earn rewards and climb the leaderboard
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="pb-3">
              <Target className="w-8 h-8 mx-auto text-red-400 mb-2" />
              <CardTitle className="text-lg">Live Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-200">
                Dynamic market events and breaking news
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Start Button */}
        <Button
          onClick={onStartGame}
          size="lg"
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          🎮 Start Trading
        </Button>

        {/* Instructions */}
        <div className="mt-8 text-blue-200">
          <p className="text-lg">💰 Starting Capital: $10,000</p>
          <p className="text-sm mt-2">Buy low, sell high, and become a meme mogul!</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
