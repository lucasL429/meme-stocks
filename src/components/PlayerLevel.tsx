
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
    if (level >= 20) return "Meme Legend";
    if (level >= 15) return "Crypto Mogul";
    if (level >= 10) return "Market Master";
    if (level >= 5) return "Meme Trader";
    return "Rookie Investor";
  };

  const getLevelColor = (level: number) => {
    if (level >= 20) return "from-purple-500 to-pink-500";
    if (level >= 15) return "from-yellow-400 to-orange-500";
    if (level >= 10) return "from-blue-500 to-indigo-500";
    if (level >= 5) return "from-green-500 to-teal-500";
    return "from-gray-400 to-gray-600";
  };

  return (
    <Card className={`bg-gradient-to-r ${getLevelColor(level)} text-white`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Level {level}
          </CardTitle>
          <Badge variant="secondary" className="bg-white/20 text-white">
            {getLevelTitle(level)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Progress to Level {level + 1}</span>
          <span>{experience.toFixed(0)} / {experienceToNext.toFixed(0)} XP</span>
        </div>
        <Progress value={progressPercentage} className="h-3 bg-white/20" />
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            <span>Portfolio: ${totalValue.toFixed(0)}</span>
          </div>
          <div className="text-right">
            <span>Next: +${((level + 1) * 500).toFixed(0)} bonus</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerLevel;
