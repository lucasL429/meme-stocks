
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import MemeCard from '@/components/MemeCard';
import Portfolio from '@/components/Portfolio';
import Leaderboard from '@/components/Leaderboard';
import UpgradeShop from '@/components/UpgradeShop';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Wallet, Trophy, ShoppingCart, Zap } from 'lucide-react';

export interface Meme {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  priceHistory: number[];
  change24h: number;
  marketCap: number;
  emoji: string;
  color: string;
}

export interface PlayerUpgrade {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  cost: number;
  effect: string;
  icon: string;
}

export interface Portfolio {
  cash: number;
  holdings: { [key: string]: number };
  totalValue: number;
  rank: number;
}

const Index = () => {
  const [memes, setMemes] = useState<Meme[]>([
    {
      id: '1',
      name: 'Doge Classic',
      symbol: 'DOGE',
      currentPrice: 0.25,
      priceHistory: [0.20, 0.22, 0.18, 0.25, 0.23, 0.25],
      change24h: 12.5,
      marketCap: 35000000,
      emoji: '🐕',
      color: '#F59E0B'
    },
    {
      id: '2',
      name: 'Pepe Premium',
      symbol: 'PEPE',
      currentPrice: 0.0015,
      priceHistory: [0.001, 0.0012, 0.0018, 0.0015, 0.0016, 0.0015],
      change24h: -8.3,
      marketCap: 25000000,
      emoji: '🐸',
      color: '#10B981'
    },
    {
      id: '3',
      name: 'Wojak Wisdom',
      symbol: 'WOJ',
      currentPrice: 0.045,
      priceHistory: [0.03, 0.035, 0.04, 0.045, 0.042, 0.045],
      change24h: 15.8,
      marketCap: 18000000,
      emoji: '😭',
      color: '#8B5CF6'
    },
    {
      id: '4',
      name: 'Chad Coin',
      symbol: 'CHAD',
      currentPrice: 0.12,
      priceHistory: [0.1, 0.11, 0.115, 0.12, 0.118, 0.12],
      change24h: 7.2,
      marketCap: 42000000,
      emoji: '💪',
      color: '#EF4444'
    },
    {
      id: '5',
      name: 'Stonks Supreme',
      symbol: 'STONK',
      currentPrice: 0.089,
      priceHistory: [0.075, 0.08, 0.085, 0.089, 0.087, 0.089],
      change24h: 9.4,
      marketCap: 28000000,
      emoji: '📈',
      color: '#06B6D4'
    }
  ]);

  const [portfolio, setPortfolio] = useState<Portfolio>({
    cash: 10000,
    holdings: {},
    totalValue: 10000,
    rank: 1
  });

  const [upgrades, setUpgrades] = useState<PlayerUpgrade[]>([
    {
      id: '1',
      name: 'Market Insight',
      description: 'Get better price predictions',
      level: 0,
      maxLevel: 10,
      cost: 500,
      effect: 'Prediction accuracy +10%',
      icon: '🔮'
    },
    {
      id: '2',
      name: 'Fast Trading',
      description: 'Reduce transaction fees',
      level: 0,
      maxLevel: 10,
      cost: 750,
      effect: 'Trading fees -5%',
      icon: '⚡'
    },
    {
      id: '3',
      name: 'Portfolio Boost',
      description: 'Increase starting capital',
      level: 0,
      maxLevel: 10,
      cost: 1000,
      effect: 'Starting cash +$1000',
      icon: '💰'
    },
    {
      id: '4',
      name: 'Meme Radar',
      description: 'Discover new memes faster',
      level: 0,
      maxLevel: 10,
      cost: 1250,
      effect: 'New meme alerts +1',
      icon: '📡'
    }
  ]);

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMemes(prevMemes => 
        prevMemes.map(meme => {
          const change = (Math.random() - 0.5) * 0.1;
          const newPrice = Math.max(0.001, meme.currentPrice * (1 + change));
          const newHistory = [...meme.priceHistory.slice(-19), newPrice];
          
          return {
            ...meme,
            currentPrice: newPrice,
            priceHistory: newHistory,
            change24h: ((newPrice - meme.priceHistory[0]) / meme.priceHistory[0]) * 100
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Calculate total portfolio value
  useEffect(() => {
    const holdingsValue = Object.entries(portfolio.holdings).reduce((total, [memeId, quantity]) => {
      const meme = memes.find(m => m.id === memeId);
      return total + (meme ? meme.currentPrice * quantity : 0);
    }, 0);

    setPortfolio(prev => ({
      ...prev,
      totalValue: prev.cash + holdingsValue
    }));
  }, [memes, portfolio.holdings, portfolio.cash]);

  const buyMeme = (memeId: string, amount: number) => {
    const meme = memes.find(m => m.id === memeId);
    if (!meme) return;

    const cost = meme.currentPrice * amount;
    if (portfolio.cash >= cost) {
      setPortfolio(prev => ({
        ...prev,
        cash: prev.cash - cost,
        holdings: {
          ...prev.holdings,
          [memeId]: (prev.holdings[memeId] || 0) + amount
        }
      }));
    }
  };

  const sellMeme = (memeId: string, amount: number) => {
    const meme = memes.find(m => m.id === memeId);
    if (!meme || !portfolio.holdings[memeId] || portfolio.holdings[memeId] < amount) return;

    const revenue = meme.currentPrice * amount;
    setPortfolio(prev => ({
      ...prev,
      cash: prev.cash + revenue,
      holdings: {
        ...prev.holdings,
        [memeId]: prev.holdings[memeId] - amount
      }
    }));
  };

  const buyUpgrade = (upgradeId: string) => {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade || upgrade.level >= upgrade.maxLevel || portfolio.cash < upgrade.cost) return;

    setPortfolio(prev => ({ ...prev, cash: prev.cash - upgrade.cost }));
    setUpgrades(prev => 
      prev.map(u => 
        u.id === upgradeId 
          ? { ...u, level: u.level + 1, cost: Math.floor(u.cost * 1.5) }
          : u
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
            🚀 MemeStocks Exchange
          </h1>
          <p className="text-lg text-gray-600 text-center">
            Invest in the hottest memes and build your fortune!
          </p>
        </div>

        {/* Portfolio Summary */}
        <Card className="mb-6 p-6 bg-gradient-to-r from-green-400 to-blue-500 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">${portfolio.totalValue.toFixed(2)}</div>
              <div className="text-green-100">Total Portfolio Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">${portfolio.cash.toFixed(2)}</div>
              <div className="text-green-100">Available Cash</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">#{portfolio.rank}</div>
              <div className="text-green-100">Global Rank</div>
            </div>
          </div>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="trading" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="trading" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Trading
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="upgrades" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Upgrades
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Leaderboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trading">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {memes.map(meme => (
                <MemeCard
                  key={meme.id}
                  meme={meme}
                  onBuy={buyMeme}
                  onSell={sellMeme}
                  playerCash={portfolio.cash}
                  holdings={portfolio.holdings[meme.id] || 0}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="portfolio">
            <Portfolio 
              portfolio={portfolio}
              memes={memes}
            />
          </TabsContent>

          <TabsContent value="upgrades">
            <UpgradeShop
              upgrades={upgrades}
              playerCash={portfolio.cash}
              onBuyUpgrade={buyUpgrade}
            />
          </TabsContent>

          <TabsContent value="leaderboard">
            <Leaderboard currentPlayer={portfolio} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
