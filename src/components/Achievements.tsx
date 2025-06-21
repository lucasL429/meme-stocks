
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Target, TrendingUp } from 'lucide-react';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  target: number;
  completed: boolean;
  reward: number;
  category: 'trading' | 'wealth' | 'upgrades' | 'special';
}

interface AchievementsProps {
  achievements: Achievement[];
  onClaimReward: (achievementId: string) => void;
}

const Achievements = ({ achievements, onClaimReward }: AchievementsProps) => {
  const completedAchievements = achievements.filter(a => a.completed);
  const inProgressAchievements = achievements.filter(a => !a.completed);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'trading': return <TrendingUp className="w-4 h-4" />;
      case 'wealth': return <Star className="w-4 h-4" />;
      case 'upgrades': return <Target className="w-4 h-4" />;
      default: return <Trophy className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'trading': return 'bg-blue-500';
      case 'wealth': return 'bg-yellow-500';
      case 'upgrades': return 'bg-purple-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6" />
            Achievements
            <Badge variant="secondary" className="bg-white/20 text-white">
              {completedAchievements.length}/{achievements.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            Overall Progress: {((completedAchievements.length / achievements.length) * 100).toFixed(0)}%
          </div>
          <Progress 
            value={(completedAchievements.length / achievements.length) * 100} 
            className="h-2 mt-2 bg-white/20" 
          />
        </CardContent>
      </Card>

      {/* Completed Achievements */}
      {completedAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-green-600 mb-3 flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Completed ({completedAchievements.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedAchievements.map((achievement) => (
              <Card key={achievement.id} className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <h4 className="font-bold text-green-800">{achievement.name}</h4>
                        <p className="text-xs text-green-600">{achievement.description}</p>
                      </div>
                    </div>
                    <Badge className={`${getCategoryColor(achievement.category)} text-white`}>
                      {getCategoryIcon(achievement.category)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-green-200 text-green-800">
                      ✓ Completed
                    </Badge>
                    <span className="text-sm font-medium text-green-700">
                      +${achievement.reward}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* In Progress Achievements */}
      <div>
        <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
          <Target className="w-5 h-5" />
          In Progress ({inProgressAchievements.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inProgressAchievements.map((achievement) => (
            <Card key={achievement.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h4 className="font-bold">{achievement.name}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  <Badge className={`${getCategoryColor(achievement.category)} text-white`}>
                    {getCategoryIcon(achievement.category)}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{achievement.progress.toFixed(0)} / {achievement.target.toFixed(0)}</span>
                  </div>
                  <Progress 
                    value={(achievement.progress / achievement.target) * 100} 
                    className="h-2" 
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {((achievement.progress / achievement.target) * 100).toFixed(0)}% complete
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      Reward: +${achievement.reward}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
