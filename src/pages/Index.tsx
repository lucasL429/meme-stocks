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
import AudioManager from '@/components/AudioManager';
import Settings from '@/components/Settings';
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
  category: string;
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
  const [showSettings, setShowSettings] = useState(false);

  // Game settings state
  const [gameSettings, setGameSettings] = useState({
    language: 'en',
    darkMode: false,
    musicEnabled: true,
    soundEffectsEnabled: true,
    musicVolume: 70,
    sfxVolume: 80,
    colorTheme: 'rainbow',
    notifications: true,
    autoSave: true
  });

  const [memes, setMemes] = useState<Meme[]>([
    {
      id: '1',
      name: 'Doge Classic',
      symbol: 'DOGE',
      currentPrice: 2.50,
      priceHistory: [2.20, 2.35, 2.10, 2.50, 2.40, 2.50],
      change24h: 12.5,
      marketCap: 350000000,
      emoji: '🐕',
      color: '#F59E0B',
      category: 'Animal Memes'
    },
    {
      id: '2',
      name: 'Pepe Premium',
      symbol: 'PEPE',
      currentPrice: 1.85,
      priceHistory: [1.50, 1.65, 1.90, 1.85, 1.88, 1.85],
      change24h: -8.3,
      marketCap: 280000000,
      emoji: '🐸',
      color: '#10B981',
      category: 'Classic Memes'
    },
    {
      id: '3',
      name: 'Wojak Wisdom',
      symbol: 'WOJ',
      currentPrice: 3.45,
      priceHistory: [2.80, 3.10, 3.25, 3.45, 3.30, 3.45],
      change24h: 15.8,
      marketCap: 195000000,
      emoji: '😭',
      color: '#8B5CF6',
      category: 'Reaction Memes'
    },
    {
      id: '4',
      name: 'Chad Coin',
      symbol: 'CHAD',
      currentPrice: 4.20,
      priceHistory: [3.80, 4.05, 4.15, 4.20, 4.10, 4.20],
      change24h: 7.2,
      marketCap: 465000000,
      emoji: '💪',
      color: '#EF4444',
      category: 'Viral Characters'
    },
    {
      id: '5',
      name: 'Stonks Supreme',
      symbol: 'STONK',
      currentPrice: 5.89,
      priceHistory: [5.25, 5.45, 5.70, 5.89, 5.75, 5.89],
      change24h: 9.4,
      marketCap: 315000000,
      emoji: '📈',
      color: '#06B6D4',
      category: 'Finance Memes'
    },
    {
      id: '6',
      name: 'Distracted Drake',
      symbol: 'DRAKE',
      currentPrice: 3.67,
      priceHistory: [3.15, 3.35, 3.55, 3.67, 3.60, 3.67],
      change24h: 18.2,
      marketCap: 385000000,
      emoji: '🦆',
      color: '#F97316',
      category: 'Choice Memes'
    },
    {
      id: '7',
      name: 'Galaxy Brain',
      symbol: 'BRAIN',
      currentPrice: 7.34,
      priceHistory: [6.20, 6.75, 7.10, 7.34, 7.15, 7.34],
      change24h: 21.4,
      marketCap: 425000000,
      emoji: '🧠',
      color: '#EC4899',
      category: 'Intellectual Memes'
    },
    {
      id: '8',
      name: 'This is Fine',
      symbol: 'FINE',
      currentPrice: 2.78,
      priceHistory: [2.35, 2.50, 2.65, 2.78, 2.70, 2.78],
      change24h: 20.0,
      marketCap: 295000000,
      emoji: '🔥',
      color: '#DC2626',
      category: 'Situation Memes'
    },
    {
      id: '9',
      name: 'Grumpy Cat',
      symbol: 'GRUMP',
      currentPrice: 6.56,
      priceHistory: [5.80, 6.10, 6.35, 6.56, 6.45, 6.56],
      change24h: 20.0,
      marketCap: 445000000,
      emoji: '😾',
      color: '#7C3AED',
      category: 'Animal Memes'
    },
    {
      id: '10',
      name: 'Success Kid',
      symbol: 'SUCCESS',
      currentPrice: 4.92,
      priceHistory: [4.20, 4.45, 4.70, 4.92, 4.85, 4.92],
      change24h: 21.1,
      marketCap: 365000000,
      emoji: '👶',
      color: '#059669',
      category: 'Success Memes'
    },
    {
      id: '11',
      name: 'Roll Safe',
      symbol: 'SAFE',
      currentPrice: 3.41,
      priceHistory: [2.90, 3.05, 3.25, 3.41, 3.35, 3.41],
      change24h: 20.6,
      marketCap: 275000000,
      emoji: '🤔',
      color: '#0891B2',
      category: 'Think Memes'
    },
    {
      id: '12',
      name: 'Woman Yelling at Cat',
      symbol: 'YELL',
      currentPrice: 5.63,
      priceHistory: [4.80, 5.10, 5.35, 5.63, 5.50, 5.63],
      change24h: 21.2,
      marketCap: 395000000,
      emoji: '😤',
      color: '#BE185D',
      category: 'Reaction Memes'
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
      // Play buy sound
      if ((window as any).playGameSound) {
        (window as any).playGameSound('buy', 0.6);
      }
      
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
          if ((window as any).playGameSound) {
            (window as any).playGameSound('achievement', 0.8);
          }
        }
        
        return {
          ...achievement,
          progress: newProgress,
          completed: completed || achievement.completed
        };
      }));
    } else {
      // Play error sound for insufficient funds
      if ((window as any).playGameSound) {
        (window as any).playGameSound('error', 0.4);
      }
    }
  };

  const sellMeme = (memeId: string, amount: number) => {
    const meme = memes.find(m => m.id === memeId);
    if (!meme || !portfolio.holdings[memeId] || portfolio.holdings[memeId] < amount) return;

    // Play sell sound
    if ((window as any).playGameSound) {
      (window as any).playGameSound('sell', 0.6);
    }

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
          if ((window as any).playGameSound) {
            (window as any).playGameSound('achievement', 0.8);
          }
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
    if (!upgrade || upgrade.level >= upgrade.maxLevel || portfolio.cash < upgrade.cost) {
      if ((window as any).playGameSound) {
        (window as any).playGameSound('error', 0.4);
      }
      return;
    }

    // Play upgrade sound
    if ((window as any).playGameSound) {
      (window as any).playGameSound('upgrade', 0.7);
    }

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
          if ((window as any).playGameSound) {
            (window as any).playGameSound('achievement', 0.8);
          }
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
      // Play notification sound
      if ((window as any).playGameSound) {
        (window as any).playGameSound('notification', 0.5);
      }
      console.log(`Event ${eventId} accepted`);
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

  const backgroundClass = gameSettings.darkMode 
    ? "min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800"
    : gameSettings.colorTheme === 'rainbow'
    ? "min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 via-blue-200 via-green-200 to-yellow-200 animate-pulse"
    : gameSettings.colorTheme === 'neon'
    ? "min-h-screen bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500"
    : gameSettings.colorTheme === 'pastel'
    ? "min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100"
    : gameSettings.colorTheme === 'retro'
    ? "min-h-screen bg-gradient-to-br from-orange-300 via-red-300 to-pink-300"
    : "min-h-screen bg-gradient-to-br from-purple-400 via-cyan-400 to-green-400";

  return (
    <div className={backgroundClass}>
      <AudioManager settings={gameSettings} />
      
      <GameEvents 
        playerCash={portfolio.cash}
        playerLevel={level}
        onEventAction={handleEventAction}
      />
      
      <Settings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={gameSettings}
        onSettingsChange={setGameSettings}
      />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header with Settings Button */}
        <div className="mb-8 relative">
          <Button
            onClick={() => setShowSettings(true)}
            className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold border-2 border-white/30"
            size="sm"
          >
            ⚙️ Settings
          </Button>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center animate-bounce">
            🚀 MemeStocks Exchange 🎮
          </h1>
          <p className="text-lg text-gray-600 text-center">
            Trade the hottest memes and build your fortune! 🌟
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
        <Card className="mb-6 p-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white shadow-2xl border-4 border-yellow-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-3xl font-bold text-yellow-200">${portfolio.totalValue.toFixed(2)}</div>
              <div className="text-green-100 font-semibold">💰 Total Portfolio Value</div>
            </div>
            <div className="text-center bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-3xl font-bold text-yellow-200">${portfolio.cash.toFixed(2)}</div>
              <div className="text-green-100 font-semibold">🏦 Available Cash</div>
            </div>
            <div className="text-center bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-3xl font-bold text-yellow-200">#{portfolio.rank}</div>
              <div className="text-green-100 font-semibold">🏆 Global Rank</div>
            </div>
          </div>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="trading" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-2xl">
            <TabsTrigger value="trading" className="flex items-center gap-2 text-white font-bold rounded-xl data-[state=active]:bg-white data-[state=active]:text-purple-600 transition-all">
              <TrendingUp className="w-4 h-4" />
              🎯 Trading
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center gap-2 text-white font-bold rounded-xl data-[state=active]:bg-white data-[state=active]:text-purple-600 transition-all">
              <Wallet className="w-4 h-4" />
              💼 Portfolio
            </TabsTrigger>
            <TabsTrigger value="upgrades" className="flex items-center gap-2 text-white font-bold rounded-xl data-[state=active]:bg-white data-[state=active]:text-purple-600 transition-all">
              <ShoppingCart className="w-4 h-4" />
              🛒 Upgrades
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2 text-white font-bold rounded-xl data-[state=active]:bg-white data-[state=active]:text-purple-600 transition-all">
              <Award className="w-4 h-4" />
              🏅 Achievements
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2 text-white font-bold rounded-xl data-[state=active]:bg-white data-[state=active]:text-purple-600 transition-all">
              <Calendar className="w-4 h-4" />
              📰 News
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2 text-white font-bold rounded-xl data-[state=active]:bg-white data-[state=active]:text-purple-600 transition-all">
              <Trophy className="w-4 h-4" />
              🥇 Leaderboard
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
