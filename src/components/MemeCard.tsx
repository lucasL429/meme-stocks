
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
    <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <span className="text-2xl">{meme.emoji}</span>
            <div>
              <div className="font-bold">{meme.name}</div>
              <div className="text-sm text-gray-500">{meme.symbol}</div>
            </div>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChart(!showChart)}
            className="p-2"
          >
            <BarChart3 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Price Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold" style={{ color: meme.color }}>
              ${meme.currentPrice.toFixed(4)}
            </span>
            <Badge variant={meme.change24h >= 0 ? "default" : "destructive"} className="flex items-center gap-1">
              {meme.change24h >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {meme.change24h.toFixed(2)}%
            </Badge>
          </div>
          
          <div className="text-sm text-gray-500">
            Market Cap: ${(meme.marketCap / 1000000).toFixed(1)}M
          </div>

          {holdings > 0 && (
            <div className="text-sm font-medium text-green-600">
              Holdings: {holdings.toFixed(2)} shares (${(holdings * meme.currentPrice).toFixed(2)})
            </div>
          )}
        </div>

        {/* Chart */}
        {showChart && (
          <div className="h-32">
            <MemeChart meme={meme} />
          </div>
        )}

        {/* Trading Controls */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="1"
              max={Math.max(maxBuy, holdings)}
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
              className="w-20"
            />
            <span className="text-sm text-gray-500">shares</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleBuy}
              disabled={!canBuy}
              className="bg-green-500 hover:bg-green-600 text-white"
              size="sm"
            >
              Buy ${(meme.currentPrice * amount).toFixed(2)}
            </Button>
            <Button
              onClick={handleSell}
              disabled={!canSell}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
              size="sm"
            >
              Sell ${(meme.currentPrice * amount).toFixed(2)}
            </Button>
          </div>

          {!canBuy && maxBuy === 0 && (
            <p className="text-xs text-red-500">Insufficient funds</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MemeCard;
