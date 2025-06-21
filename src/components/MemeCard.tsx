
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { Meme } from '@/pages/Index';
import MemeChart from './MemeChart';

interface MemeCardProps {
  meme: Meme;
  onBuy: (memeId: string, amount: number) => void;
  onSell: (memeId: string, amount: number) => void;
  playerCash: number;
  holdings: number;
}

const MemeCard = ({ meme, onBuy, onSell, playerCash, holdings }: MemeCardProps) => {
  const [amount, setAmount] = useState(1);
  const [showChart, setShowChart] = useState(false);

  const maxBuy = Math.floor(playerCash / meme.currentPrice);
  const canBuy = maxBuy > 0 && amount <= maxBuy;
  const canSell = holdings >= amount && amount > 0;

  const handleBuy = () => {
    if (canBuy) {
      onBuy(meme.id, amount);
      setAmount(1);
    }
  };

  const handleSell = () => {
    if (canSell) {
      onSell(meme.id, amount);
      setAmount(1);
    }
  };

  return (
    <Card className="hover:shadow-2xl transition-all duration-300 border-4 hover:border-yellow-300 bg-gradient-to-br from-white to-purple-50 transform hover:scale-105">
      <CardHeader className="pb-3 bg-gradient-to-r from-pink-100 to-blue-100 rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-lg">
            <span className="text-3xl animate-bounce">{meme.emoji}</span>
            <div>
              <div className="font-bold text-gray-800">{meme.name}</div>
              <div className="text-sm text-gray-600 font-semibold">{meme.symbol}</div>
              <Badge variant="outline" className="text-xs mt-1 bg-white/80 text-purple-700 border-purple-300">
                📂 {meme.category}
              </Badge>
            </div>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChart(!showChart)}
            className="p-2 bg-white/80 hover:bg-white border-2 border-purple-300 hover:border-purple-500"
          >
            <BarChart3 className="w-4 h-4 text-purple-600" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-6">
        {/* Price Info */}
        <div className="space-y-3 bg-white/60 rounded-xl p-4 border-2 border-purple-200">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold" style={{ color: meme.color }}>
              💰 ${meme.currentPrice.toFixed(4)}
            </span>
            <Badge 
              variant={meme.change24h >= 0 ? "default" : "destructive"} 
              className={`flex items-center gap-1 font-bold px-3 py-1 ${
                meme.change24h >= 0 
                  ? 'bg-green-500 text-white animate-pulse' 
                  : 'bg-red-500 text-white animate-pulse'
              }`}
            >
              {meme.change24h >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {meme.change24h.toFixed(2)}%
            </Badge>
          </div>
          
          <div className="text-sm text-gray-600 font-semibold">
            🏪 Market Cap: ${(meme.marketCap / 1000000).toFixed(1)}M
          </div>

          {holdings > 0 && (
            <div className="text-sm font-bold text-green-700 bg-green-100 rounded-lg p-2 border-2 border-green-300">
              💎 Holdings: {holdings.toFixed(2)} shares (${(holdings * meme.currentPrice).toFixed(2)})
            </div>
          )}
        </div>

        {/* Chart */}
        {showChart && (
          <div className="h-32 bg-white/80 rounded-xl p-3 border-2 border-blue-200">
            <MemeChart meme={meme} />
          </div>
        )}

        {/* Trading Controls */}
        <div className="space-y-3 bg-gradient-to-r from-yellow-50 to-pink-50 rounded-xl p-4 border-2 border-yellow-300">
          <div className="flex items-center gap-3">
            <Input
              type="number"
              min="1"
              max={Math.max(maxBuy, holdings)}
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
              className="w-20 border-2 border-purple-300 font-bold text-center"
            />
            <span className="text-sm text-gray-600 font-semibold">🎯 shares</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleBuy}
              disabled={!canBuy}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold border-2 border-green-400 shadow-lg transform hover:scale-105 transition-all"
              size="sm"
            >
              🛒 Buy ${(meme.currentPrice * amount).toFixed(2)}
            </Button>
            <Button
              onClick={handleSell}
              disabled={!canSell}
              variant="outline"
              className="border-2 border-red-400 text-red-600 hover:bg-red-50 font-bold bg-white shadow-lg transform hover:scale-105 transition-all"
              size="sm"
            >
              💸 Sell ${(meme.currentPrice * amount).toFixed(2)}
            </Button>
          </div>

          {!canBuy && maxBuy === 0 && (
            <p className="text-xs text-red-600 bg-red-100 rounded-lg p-2 border border-red-300 font-semibold">
              💔 Not enough cash! Need more funds!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MemeCard;
