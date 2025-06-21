import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import MemeCard from '@/components/MemeCard';
import Portfolio from '@/components/Portfolio';
import Leaderboard from '@/components/Leaderboard';
import UpgradeShop from '@/components/UpgradeShop';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Wallet, Trophy, ShoppingCart, Zap, Star, Award, Calendar } from 'lucide-react';
import WelcomeScreen from '@/components/WelcomeScreen';
import MarketNews from '@/components/MarketNews';
import GameEvents from '@/components/GameEvents';
import PlayerLevel from '@/components/PlayerLevel';
import Achievements from '@/components/Achievements';
import type { Achievement } from '@/components/Achievements';

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
  const [gameStarted, setGameStarted] = useState(false);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [playerExperience, setPlayerExperience] = useState(0);
  
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

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      name: 'First Trade',
      description: 'Make your first meme investment',
      icon: '🎯',
      progress: 0,
      target: 1,
      completed: false,
      reward: 100,
      category: 'trading'
    },
    {
      id: '2',
      name: 'Portfolio Starter',
      description: 'Reach $15,000 portfolio value',
      icon: '💰',
      progress: 10000,
      target: 15000,
      completed: false,
      reward: 500,
      category: 'wealth'
    },
    {
      id: '3',
      name: 'Meme Mogul',
      description: 'Reach $50,000 portfolio value',
      icon: '👑',
      progress: 10000,
      target: 50000,
      completed: false,
      reward: 2000,
      category: 'wealth'
    },
    {
      id: '4',
      name: 'Upgrade Master',
      description: 'Purchase 5 upgrades',
      icon: '⚡',
      progress: 0,
      target: 5,
      completed: false,
      reward: 1000,
      category: 'upgrades'
    },
    {
      id: '5',
      name: 'Diamond Hands',
      description: 'Hold a meme for 5 minutes',
      icon: '💎',
      progress: 0,
      target: 1,
      completed: false,
      reward: 750,
      category: 'special'
    },
    {
      id: '6',
      name: 'Day Trader',
      description: 'Complete 50 trades',
      icon: '📊',
      progress: 0,
      target: 50,
      completed: false,
      reward: 1500,
      category: 'trading'
    }
  ]);

  const [totalTrades, setTotalTrades] = useState(0);

  // Calculate player level and experience
  const calculateLevel = (totalValue: number) => {
    const baseValue = 10000;
    const levelThreshold = 5000; // $5000 per level
    const level = Math.floor((totalValue - baseValue) / levelThreshold) + 1;
    const experience = (totalValue - baseValue) % levelThreshold;
    const experienceToNext = levelThreshold;
    
    return { level: Math.max(1, level), experience, experienceToNext };
  };

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

    const newTotalValue = portfolio.cash + holdingsValue;
    
    setPortfolio(prev => ({
      ...prev,
      totalValue: newTotalValue
    }));

    // Update player level
    const { level, experience, experienceToNext } = calculateLevel(newTotalValue);
    if (level > playerLevel) {
      setPlayerLevel(level);
      // Level up bonus event could be triggered here
    }
    setPlayerExperience(experience);

    // Update achievements
    setAchievements(prev => prev.map(achievement => {
      let newProgress = achievement.progress;
      
      switch (achievement.id) {
        case '2':
        case '3':
          newProgress = newTotalValue;
          break;
      }
      
      const completed = newProgress >= achievement.target && !achievement.completed;
      if (completed) {
        setPortfolio(p => ({ ...p, cash: p.cash + achievement.reward }));
      }
      
      return {
        ...achievement,
        progress: newProgress,
        completed: completed || achievement.completed
      };
    }));
  }, [memes, portfolio.holdings, portfolio.cash, playerLevel]);

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
      
      setTotalTrades(prev => prev + 1);
      
      // Update achievements
      setAchievements(prev => prev.map(achievement => {
        let newProgress = achievement.progress;
        
        switch (achievement.id) {
          case '1':
            newProgress = 1;
            break;
          case '6':
            newProgress = totalTrades + 1;
            break;
        }
        
        const completed = newProgress >= achievement.target && !achievement.completed;
        if (completed) {
          setPortfolio(p => ({ ...p, cash: p.cash + achievement.reward }));
        }
        
        return {
          ...achievement,
          progress: newProgress,
          completed: completed || achievement.completed
        };
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
    
    setTotalTrades(prev => prev + 1);
    
    // Update trade count achievement
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === '6') {
        const newProgress = totalTrades + 1;
        const completed = newProgress >= achievement.target && !achievement.completed;
        if (completed) {
          setPortfolio(p => ({ ...p, cash: p.cash + achievement.reward }));
        }
        return {
          ...achievement,
          progress: newProgress,
          completed: completed || achievement.completed
        };
      }
      return achievement;
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
    
    // Update upgrade achievement
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === '4') {
        const totalUpgrades = upgrades.reduce((sum, u) => sum + u.level, 0) + 1;
        const completed = totalUpgrades >= achievement.target && !achievement.completed;
        if (completed) {
          setPortfolio(p => ({ ...p, cash: p.cash + achievement.reward }));
        }
        return {
          ...achievement,
          progress: totalUpgrades,
          completed: completed || achievement.completed
        };
      }
      return achievement;
    }));
  };

  const handleEventAction = (eventId: string, action: 'accept' | 'dismiss') => {
    if (action === 'accept') {
      // Handle event rewards/effects here
      console.log(`Event ${eventId} accepted`);
      // You could add specific event handling logic here
    }
  };

  const handleClaimAchievementReward = (achievementId: string) => {
    // Rewards are automatically claimed when achievements are completed
    console.log(`Achievement ${achievementId} reward claimed`);
  };

  const memeNames = memes.reduce((acc, meme) => {
    acc[meme.id] = meme.name;
    return acc;
  }, {} as { [key: string]: string });

  const { level, experience, experienceToNext } = calculateLevel(portfolio.totalValue);

  if (!gameStarted) {
    return <WelcomeScreen onStartGame={() => setGameStarted(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <GameEvents 
        playerCash={portfolio.cash}
        playerLevel={level}
        onEventAction={handleEventAction}
      />
      
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

        {/* Player Level Card */}
        <div className="mb-6">
          <PlayerLevel 
            level={level}
            experience={experience}
            experienceToNext={experienceToNext}
            totalValue={portfolio.totalValue}
          />
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
          <TabsList className="grid w-full grid-cols-6 mb-6">
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
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              News
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

          <TabsContent value="achievements">
            <Achievements
              achievements={achievements}
              onClaimReward={handleClaimAchievementReward}
            />
          </TabsContent>

          <TabsContent value="news">
            <MarketNews memeNames={memeNames} />
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
