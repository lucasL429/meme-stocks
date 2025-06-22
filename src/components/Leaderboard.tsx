
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Medal, Award, Crown, Users, Wifi, WifiOff } from 'lucide-react';
import { Portfolio } from '@/pages/Index';

interface LeaderboardProps {
  currentPlayer: Portfolio;
}

const Leaderboard = ({ currentPlayer }: LeaderboardProps) => {
  // Mock leaderboard data - in a real app this would come from Supabase
  const leaderboardData = [
    { rank: 1, name: "CryptoKing2024", value: 85670.23, avatar: "👑", isOnline: true },
    { rank: 2, name: "MemeQueen", value: 72492.15, avatar: "👸", isOnline: true },
    { rank: 3, name: "SigmaTrader", value: 68821.67, avatar: "🗿", isOnline: false },
    { rank: 4, name: "RizzMaster", value: 59384.44, avatar: "😎", isOnline: true },
    { rank: 5, name: "SkibidiLord", value: 45671.88, avatar: "🚽", isOnline: true },
    { rank: 6, name: "You", value: currentPlayer.totalValue, avatar: "🎮", isOnline: true },
    { rank: 7, name: "OhioVibes", value: 28492.33, avatar: "🌽", isOnline: false },
    { rank: 8, name: "GyattGamer", value: 26741.22, avatar: "🍑", isOnline: true },
    { rank: 9, name: "FanumTaxer", value: 24523.77, avatar: "🍟", isOnline: false },
    { rank: 10, name: "NPCStreamer", value: 22890.45, avatar: "🤖", isOnline: true },
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
      {/* Header with Connection Status */}
      <Card className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Trophy className="w-6 h-6" />
            Global Leaderboard
            <div className="ml-auto flex items-center gap-2">
              <WifiOff className="w-5 h-5 text-red-200" />
              <span className="text-sm">Offline Mode</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-yellow-100">
              📡 Connect to see real-time rankings with other players worldwide!
            </p>
            <Button 
              className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50"
              onClick={() => alert('Connect to Supabase to enable live leaderboard functionality!')}
            >
              🔗 Connect for Live Rankings
            </Button>
          </div>
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
              <div className="text-blue-600">Current Rank</div>
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
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Top Traders (Demo Mode)
          </CardTitle>
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
                    <div className="flex items-center gap-1">
                      {player.isOnline ? (
                        <Wifi className="w-3 h-3 text-green-500" />
                      ) : (
                        <WifiOff className="w-3 h-3 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className={`font-semibold ${player.name === "You" ? 'text-blue-800' : 'text-gray-800'}`}>
                      {player.name}
                      {player.name === "You" && (
                        <Badge className="ml-2 bg-blue-500">You</Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {player.isOnline ? '🟢 Online' : '🔴 Offline'}
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
          <CardTitle>🏆 Recent Achievements</CardTitle>
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
