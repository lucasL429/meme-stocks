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
import Tutorial from '@/components/Tutorial';
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
  const [showTutorial, setShowTutorial] = useState(false);

  // Game settings state
  const [gameSettings, setGameSettings] = useState({
    language: 'en',
    darkMode: false,
    colorTheme: 'rainbow',
    notifications: true,
    autoSave: true
  });

  const [memes, setMemes] = useState<Meme[]>([
    // Updated with more relevant TikTok trends
    {
      id: '1',
      name: 'Skibidi Toilet',
      symbol: 'SKBT',
      currentPrice: 12.45,
      priceHistory: [8.20, 9.65, 11.10, 12.45, 11.85, 12.45],
      change24h: 51.8,
      marketCap: 890000000,
      emoji: '🚽',
      color: '#10B981',
      category: 'Viral Comedy'
    },
    {
      id: '2',
      name: 'Ohio Sigma',
      symbol: 'OHIO',
      currentPrice: 24.67,
      priceHistory: [18.50, 20.25, 22.10, 24.67, 23.30, 24.67],
      change24h: 33.3,
      marketCap: 1200000000,
      emoji: '🗿',
      color: '#EC4899',
      category: 'Gen Z Culture'
    },
    {
      id: '3',
      name: 'Rizz Level',
      symbol: 'RIZZ',
      currentPrice: 35.89,
      priceHistory: [28.80, 31.95, 33.65, 35.89, 34.15, 35.89],
      change24h: 24.6,
      marketCap: 1580000000,
      emoji: '😎',
      color: '#8B5CF6',
      category: 'Dating/Relationship'
    },
    {
      id: '4',
      name: 'Gyatt Moment',
      symbol: 'GYAT',
      currentPrice: 18.23,
      priceHistory: [14.20, 15.85, 17.35, 18.23, 17.80, 18.23],
      change24h: 28.4,
      marketCap: 750000000,
      emoji: '🍑',
      color: '#F59E0B',
      category: 'Viral Slang'
    },
    {
      id: '5',
      name: 'Fanum Tax',
      symbol: 'FNTX',
      currentPrice: 45.12,
      priceHistory: [35.50, 39.25, 42.10, 45.12, 43.45, 45.12],
      change24h: 27.1,
      marketCap: 1890000000,
      emoji: '🍟',
      color: '#06B6D4',
      category: 'Food Trends'
    },
    {
      id: '6',
      name: 'NPC Stream',
      symbol: 'NPC',
      currentPrice: 67.45,
      priceHistory: [52.30, 58.80, 63.20, 67.45, 65.90, 67.45],
      change24h: 29.0,
      marketCap: 2400000000,
      emoji: '🤖',
      color: '#F97316',
      category: 'Live Streaming'
    },
    {
      id: '7',
      name: 'Sigma Grindset',
      symbol: 'SGMA',
      currentPrice: 89.67,
      priceHistory: [68.60, 75.90, 82.15, 89.67, 86.80, 89.67],
      change24h: 30.7,
      marketCap: 3200000000,
      emoji: '💪',
      color: '#EF4444',
      category: 'Motivation'
    },
    {
      id: '8',
      name: 'Grimace Shake',
      symbol: 'GRMC',
      currentPrice: 34.89,
      priceHistory: [26.80, 29.50, 32.30, 34.89, 33.40, 34.89],
      change24h: 30.1,
      marketCap: 1450000000,
      emoji: '🟣',
      color: '#DC2626',
      category: 'Food Trends'
    },
    {
      id: '9',
      name: 'Smurf Cat',
      symbol: 'SMRF',
      currentPrice: 56.78,
      priceHistory: [42.70, 47.45, 52.80, 56.78, 54.20, 56.78],
      change24h: 33.0,
      marketCap: 2100000000,
      emoji: '😺',
      color: '#7C3AED',
      category: 'Animal Memes'
    },
    {
      id: '10',
      name: 'Bing Chilling',
      symbol: 'BING',
      currentPrice: 78.90,
      priceHistory: [58.50, 65.30, 72.40, 78.90, 75.70, 78.90],
      change24h: 34.9,
      marketCap: 2800000000,
      emoji: '🍦',
      color: '#059669',
      category: 'International'
    },
    {
      id: '11',
      name: 'Alpha Male',
      symbol: 'ALFA',
      currentPrice: 125.45,
      priceHistory: [89.90, 102.30, 115.85, 125.45, 120.55, 125.45],
      change24h: 39.5,
      marketCap: 4200000000,
      emoji: '🦁',
      color: '#0891B2',
      category: 'Lifestyle'
    },
    {
      id: '12',
      name: 'Based Take',
      symbol: 'BASD',
      currentPrice: 92.34,
      priceHistory: [68.25, 76.40, 84.15, 92.34, 88.30, 92.34],
      change24h: 35.3,
      marketCap: 3400000000,
      emoji: '🧠',
      color: '#BE185D',
      category: 'Opinion/Commentary'
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
    if (!upgrade || upgrade.level >= upgrade.maxLevel || portfolio.cash < upgrade.cost) {
      return;
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

  const handleEventAction = (eventId: string, action: 'accept' | 'dismiss', eventType?: string) => {
    if (action === 'accept') {
      console.log(`Event ${eventId} accepted with type: ${eventType}`);
      
      // Handle different event types
      switch (eventType) {
        case 'market_crash':
          // Apply market crash effects
          setMemes(prevMemes => 
            prevMemes.map(meme => ({
              ...meme,
              currentPrice: meme.currentPrice * (0.1 + Math.random() * 0.2), // 70-90% crash
              change24h: -70 - Math.random() * 20
            }))
          );
          break;
          
        case 'market_boost':
          // Apply market boost effects
          setMemes(prevMemes => 
            prevMemes.map(meme => ({
              ...meme,
              currentPrice: meme.currentPrice * (1.5 + Math.random() * 1.0), // 50-150% boost
              change24h: 50 + Math.random() * 100
            }))
          );
          break;
          
        case 'surge':
          // Random meme gets massive boost
          const randomMemeIndex = Math.floor(Math.random() * memes.length);
          setMemes(prevMemes => 
            prevMemes.map((meme, index) => 
              index === randomMemeIndex 
                ? {
                    ...meme,
                    currentPrice: meme.currentPrice * (3 + Math.random() * 2), // 300-500% boost
                    change24h: 300 + Math.random() * 200
                  }
                : meme
            )
          );
          break;
          
        case 'chaos':
          // Extreme random volatility
          setMemes(prevMemes => 
            prevMemes.map(meme => {
              const volatility = (Math.random() - 0.5) * 4; // ±200% change
              return {
                ...meme,
                currentPrice: Math.max(0.01, meme.currentPrice * (1 + volatility)),
                change24h: volatility * 100
              };
            })
          );
          break;
          
        case 'bonus':
          // Give player bonus cash
          setPortfolio(prev => ({ ...prev, cash: prev.cash + 2000 }));
          break;
          
        default:
          console.log('Unknown event type:', eventType);
      }
    }
  };

  const handleClaimAchievementReward = (achievementId: string) => {
    console.log(`Achievement ${achievementId} reward claimed`);
  };

  const memeNames = memes.reduce((acc, meme) => {
    acc[meme.id] = meme.name;
    return acc;
  }, {} as { [key: string]: string });

  const { level, experience, experienceToNext } = calculateLevel(portfolio.totalValue);

  if (!gameStarted) {
    return <WelcomeScreen onStartGame={() => setGameStarted(true)} onShowTutorial={() => setShowTutorial(true)} />;
  }

  const backgroundClass = gameSettings.darkMode 
    ? "min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800"
    : gameSettings.colorTheme === 'rainbow'
    ? "min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 via-blue-300 via-green-300 via-yellow-300 to-red-300"
    : gameSettings.colorTheme === 'neon'
    ? "min-h-screen bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500"
    : gameSettings.colorTheme === 'pastel'
    ? "min-h-screen bg-gradient-to-br from-pink-200 via-purple-100 to-cyan-200"
    : gameSettings.colorTheme === 'retro'
    ? "min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-pink-400"
    : "min-h-screen bg-gradient-to-br from-purple-500 via-cyan-500 to-green-500";

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
        onShowTutorial={() => setShowTutorial(true)}
      />

      <Tutorial
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
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
          
          <h1 className="text-4xl font-bold text-white mb-2 text-center drop-shadow-2xl">
            🚀 MemeStocks Exchange 🎮
          </h1>
          <p className="text-lg text-white text-center font-bold drop-shadow-lg">
            Trade viral TikTok memes and build your fortune! 🌟📱
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
            <MarketNews memeNames={memeNames} memes={memes} />
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
