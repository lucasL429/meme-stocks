
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp } from 'lucide-react';

interface PlayerLevelProps {
  level: number;
  experience: number;
  experienceToNext: number;
  totalValue: number;
}

const PlayerLevel = ({ level, experience, experienceToNext, totalValue }: PlayerLevelProps) => {
  const progressPercentage = (experience / experienceToNext) * 100;
  
  const getLevelTitle = (level: number) => {
    if (level >= 20) return "🏆 Meme Legend";
    if (level >= 15) return "👑 Crypto Mogul";
    if (level >= 10) return "🎯 Market Master";
    if (level >= 5) return "📈 Meme Trader";
    return "🌱 Rookie Investor";
  };

  const getLevelColor = (level: number) => {
    if (level >= 20) return "from-purple-500 via-pink-500 to-red-500";
    if (level >= 15) return "from-yellow-400 via-orange-500 to-red-500";
    if (level >= 10) return "from-blue-500 via-purple-500 to-pink-500";
    if (level >= 5) return "from-green-500 via-teal-500 to-blue-500";
    return "from-gray-400 via-gray-500 to-gray-600";
  };

  return (
    <Card className={`bg-gradient-to-r ${getLevelColor(level)} text-white shadow-2xl border-4 border-yellow-300 transform hover:scale-105 transition-all duration-300`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <Star className="w-6 h-6 animate-spin" />
            <span className="text-2xl font-bold">Level {level}</span>
            <span className="animate-bounce">⭐</span>
          </CardTitle>
          <Badge variant="secondary" className="bg-white/30 text-white border-2 border-white/50 px-4 py-2 text-lg font-bold">
            {getLevelTitle(level)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm border-2 border-white/30">
          <div className="flex justify-between text-sm font-bold mb-2">
            <span>🎯 Progress to Level {level + 1}</span>
            <span>{experience.toFixed(0)} / {experienceToNext.toFixed(0)} XP</span>
          </div>
          <Progress value={progressPercentage} className="h-4 bg-white/30 border-2 border-white/50" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 bg-white/20 rounded-lg p-3 backdrop-blur-sm border-2 border-white/30">
            <TrendingUp className="w-5 h-5 animate-pulse" />
            <span className="font-bold">💰 Portfolio: ${totalValue.toFixed(0)}</span>
          </div>
          <div className="text-right bg-white/20 rounded-lg p-3 backdrop-blur-sm border-2 border-white/30">
            <span className="font-bold">🎁 Next: +${((level + 1) * 500).toFixed(0)} bonus</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerLevel;
