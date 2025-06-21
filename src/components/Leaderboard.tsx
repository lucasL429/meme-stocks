
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, Crown } from 'lucide-react';
import { Portfolio } from '@/pages/Index';

interface LeaderboardProps {
  currentPlayer: Portfolio;
}

const Leaderboard = ({ currentPlayer }: LeaderboardProps) => {
  // Mock leaderboard data - in a real app this would come from a backend
  const leaderboardData = [
    { rank: 1, name: "MemeKing420", value: 45670.23, avatar: "👑" },
    { rank: 2, name: "StonksGuru", value: 38492.15, avatar: "🚀" },
    { rank: 3, name: "DogeWhisperer", value: 35821.67, avatar: "🐕" },
    { rank: 4, name: "PepeTrader", value: 29384.44, avatar: "🐸" },
    { rank: 5, name: "DiamondHands", value: 25671.88, avatar: "💎" },
    { rank: 6, name: "You", value: currentPlayer.totalValue, avatar: "😎" },
    { rank: 7, name: "MemeLord88", value: 18492.33, avatar: "🔥" },
    { rank: 8, name: "ShibaArmy", value: 16741.22, avatar: "🐶" },
    { rank: 9, name: "CryptoNoob", value: 14523.77, avatar: "🤓" },
    { rank: 10, name: "HODLer4Life", value: 12890.45, avatar: "💪" },
  ].sort((a, b) => b.value - a.value).map((player, index) => ({ ...player, rank: index + 1 }));

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Trophy className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <Award className="w-5 h-5 text-gray-300" />;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500";
    if (rank === 3) return "bg-gradient-to-r from-amber-400 to-amber-600";
    if (rank <= 10) return "bg-gradient-to-r from-blue-400 to-blue-600";
    return "bg-gradient-to-r from-gray-400 to-gray-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Trophy className="w-6 h-6" />
            Global Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-100">
            Compete with traders worldwide! Rankings update in real-time based on portfolio value.
          </p>
        </CardContent>
      </Card>

      {/* Current Player Stats */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">Your Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-800">
                #{leaderboardData.find(p => p.name === "You")?.rank || 'N/A'}
              </div>
              <div className="text-blue-600">Global Rank</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                ${currentPlayer.totalValue.toFixed(2)}
              </div>
              <div className="text-blue-600">Portfolio Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {((currentPlayer.totalValue - 10000) / 10000 * 100).toFixed(1)}%
              </div>
              <div className="text-blue-600">Total Return</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Top Traders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboardData.slice(0, 10).map((player) => (
              <div
                key={`${player.name}-${player.rank}`}
                className={`flex items-center justify-between p-4 rounded-lg transition-all hover:shadow-md ${
                  player.name === "You" 
                    ? 'bg-blue-100 border-2 border-blue-300' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${getRankBadgeColor(player.rank)}`}>
                    {player.rank}
                  </div>
                  <div className="flex items-center gap-2">
                    {getRankIcon(player.rank)}
                    <span className="text-2xl">{player.avatar}</span>
                  </div>
                  <div>
                    <div className={`font-semibold ${player.name === "You" ? 'text-blue-800' : 'text-gray-800'}`}>
                      {player.name}
                      {player.name === "You" && (
                        <Badge className="ml-2 bg-blue-500">You</Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      Portfolio Value
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">
                    ${player.value.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    +{((player.value - 10000) / 10000 * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievement Badges */}
      <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <CardHeader>
          <CardTitle>🏆 Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/20 rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-xs">First Trade</div>
            </div>
            <div className="text-center p-3 bg-white/20 rounded-lg">
              <div className="text-2xl mb-2">💰</div>
              <div className="text-xs">Profit Maker</div>
            </div>
            <div className="text-center p-3 bg-white/10 rounded-lg opacity-50">
              <div className="text-2xl mb-2">🚀</div>
              <div className="text-xs">Top 100</div>
            </div>
            <div className="text-center p-3 bg-white/10 rounded-lg opacity-50">
              <div className="text-2xl mb-2">👑</div>
              <div className="text-xs">Meme Master</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
