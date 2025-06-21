
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PlayerUpgrade } from '@/pages/Index';
import { Zap, Lock } from 'lucide-react';

interface UpgradeShopProps {
  upgrades: PlayerUpgrade[];
  playerCash: number;
  onBuyUpgrade: (upgradeId: string) => void;
}

const UpgradeShop = ({ upgrades, playerCash, onBuyUpgrade }: UpgradeShopProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Zap className="w-6 h-6" />
            Power-Up Shop
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-100">
            Enhance your trading abilities with powerful upgrades! Each upgrade has 10 levels of improvement.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {upgrades.map((upgrade) => {
          const canAfford = playerCash >= upgrade.cost;
          const isMaxLevel = upgrade.level >= upgrade.maxLevel;
          const progressPercentage = (upgrade.level / upgrade.maxLevel) * 100;

          return (
            <Card key={upgrade.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{upgrade.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{upgrade.name}</CardTitle>
                      <p className="text-sm text-gray-600">{upgrade.description}</p>
                    </div>
                  </div>
                  <Badge variant={isMaxLevel ? "secondary" : "default"}>
                    Level {upgrade.level}/{upgrade.maxLevel}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{progressPercentage.toFixed(0)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>

                {/* Effect */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-sm font-medium text-blue-800">
                    {upgrade.effect}
                  </div>
                  {upgrade.level > 0 && (
                    <div className="text-xs text-blue-600 mt-1">
                      Current bonus: Level {upgrade.level} active
                    </div>
                  )}
                </div>

                {/* Buy Button */}
                <Button
                  onClick={() => onBuyUpgrade(upgrade.id)}
                  disabled={!canAfford || isMaxLevel}
                  className={`w-full ${
                    isMaxLevel 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : canAfford 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  {isMaxLevel ? (
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Max Level Reached
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Upgrade for ${upgrade.cost.toFixed(0)}
                    </span>
                  )}
                </Button>

                {!canAfford && !isMaxLevel && (
                  <p className="text-xs text-red-500 text-center">
                    Need ${(upgrade.cost - playerCash).toFixed(0)} more
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tips */}
      <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-2">💡 Pro Tips</h3>
          <ul className="text-sm space-y-1 text-yellow-100">
            <li>• Higher level upgrades cost more but provide better benefits</li>
            <li>• Focus on Market Insight early for better trading decisions</li>
            <li>• Portfolio Boost helps you make bigger investments</li>
            <li>• Fast Trading saves money on every transaction</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpgradeShop;
