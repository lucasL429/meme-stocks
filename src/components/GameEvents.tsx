
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Gift, TrendingUp, Zap, AlertTriangle } from 'lucide-react';

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  type: 'bonus' | 'market_boost' | 'discount' | 'challenge' | 'crash' | 'surge' | 'chaos' | 'regulatory' | 'viral' | 'whale';
  effect: string;
  duration?: number;
  reward?: number;
  penalty?: number;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface GameEventsProps {
  playerCash: number;
  playerLevel: number;
  onEventAction: (eventId: string, action: 'accept' | 'dismiss') => void;
}

const GameEvents = ({ playerCash, playerLevel, onEventAction }: GameEventsProps) => {
  const [activeEvents, setActiveEvents] = useState<GameEvent[]>([]);

  const generateEvent = (): GameEvent | null => {
    const currentHour = new Date().getHours();
    const marketSentiment = Math.random();
    
    const events = [
      // Fun Events
      {
        title: "🎉 Meme Olympics Started!",
        description: "All memes are competing for the gold medal!",
        type: 'market_boost' as const,
        effect: "All prices get random 20-50% boosts",
        duration: 240000,
        icon: "🏅",
        rarity: 'epic' as const,
        trigger: () => Math.random() < 0.15
      },
      {
        title: "🤖 AI Bot Invasion",
        description: "Trading bots are going crazy in the market!",
        type: 'chaos' as const,
        effect: "Extreme price volatility for 3 minutes",
        duration: 180000,
        icon: "🤖",
        rarity: 'rare' as const,
        trigger: () => Math.random() < 0.12
      },
      {
        title: "🎪 Meme Carnival",
        description: "Step right up! Everyone's a winner at the meme carnival!",
        type: 'bonus' as const,
        effect: "Receive $2000 carnival prize",
        reward: 2000,
        icon: "🎡",
        rarity: 'rare' as const,
        trigger: () => playerLevel >= 3 && Math.random() < 0.2
      },

      // Hard/Challenging Events
      {
        title: "🌪️ Market Hurricane",
        description: "A devastating storm hits the meme market!",
        type: 'crash' as const,
        effect: "All prices drop 30-60% for 4 minutes",
        duration: 240000,
        penalty: 1000,
        icon: "🌪️",
        rarity: 'epic' as const,
        trigger: () => marketSentiment < 0.1 && Math.random() < 0.08
      },
      {
        title: "🏛️ Government Regulation",
        description: "New meme trading laws are being proposed!",
        type: 'regulatory' as const,
        effect: "Trading fees increase by 50% for 5 minutes",
        duration: 300000,
        penalty: 500,
        icon: "⚖️",
        rarity: 'rare' as const,
        trigger: () => playerLevel >= 5 && Math.random() < 0.1
      },
      {
        title: "🔥 Server Overload",
        description: "Too many traders! The servers are struggling!",
        type: 'challenge' as const,
        effect: "Complete 3 trades in 2 minutes for $3000",
        reward: 3000,
        duration: 120000,
        icon: "💥",
        rarity: 'epic' as const,
        trigger: () => Math.random() < 0.07
      },

      // Cool Events
      {
        title: "🚀 SpaceX Meme Launch",
        description: "Elon just tweeted about memes from space!",
        type: 'surge' as const,
        effect: "All memes surge 25-40% instantly",
        icon: "🚀",
        rarity: 'legendary' as const,
        trigger: () => Math.random() < 0.05
      },
      {
        title: "🎬 Hollywood Meme Movie",
        description: "A major studio is making a meme movie!",
        type: 'viral' as const,
        effect: "Classic memes get 60% boost for 6 minutes",
        duration: 360000,
        icon: "🎭",
        rarity: 'epic' as const,
        trigger: () => Math.random() < 0.08
      },
      {
        title: "🌟 Celebrity Endorsement",
        description: "A-list celebrities are buying memes!",
        type: 'surge' as const,
        effect: "Random category gets massive boost",
        duration: 180000,
        icon: "⭐",
        rarity: 'rare' as const,
        trigger: () => Math.random() < 0.12
      },

      // Time-based Events
      {
        title: "🌙 Night Owl Bonus",
        description: "Late night traders get special rewards!",
        type: 'bonus' as const,
        effect: "Receive $1500 night bonus",
        reward: 1500,
        icon: "🦉",
        rarity: 'common' as const,
        trigger: () => (currentHour >= 22 || currentHour <= 6) && Math.random() < 0.3
      },
      {
        title: "☀️ Morning Market Surge",
        description: "The market is bright and early today!",
        type: 'market_boost' as const,
        effect: "All prices get morning boost",
        duration: 300000,
        icon: "🌅",
        rarity: 'common' as const,
        trigger: () => currentHour >= 6 && currentHour <= 10 && Math.random() < 0.25
      },

      // Whale Events
      {
        title: "🐋 Crypto Whale Alert",
        description: "A massive whale is making moves!",
        type: 'whale' as const,
        effect: "Random huge price swings",
        duration: 240000,
        icon: "🐋",
        rarity: 'legendary' as const,
        trigger: () => playerCash > 50000 && Math.random() < 0.06
      },
      {
        title: "💎 Diamond Hands Event",
        description: "HODL gang is taking over!",
        type: 'challenge' as const,
        effect: "Don't sell for 3 minutes, get $4000",
        reward: 4000,
        duration: 180000,
        icon: "💎",
        rarity: 'epic' as const,
        trigger: () => playerLevel >= 4 && Math.random() < 0.1
      },

      // Market Sentiment Events
      {
        title: "📱 TikTok Viral Trend",
        description: "A new meme just went viral on TikTok!",
        type: 'viral' as const,
        effect: "Animal memes surge 80%",
        duration: 300000,
        icon: "📱",
        rarity: 'rare' as const,
        trigger: () => Math.random() < 0.15
      },
      {
        title: "🎮 Gaming Meme Explosion",
        description: "Gamers are going crazy for memes!",
        type: 'surge' as const,
        effect: "Gaming-related memes skyrocket",
        duration: 240000,
        icon: "🎮",
        rarity: 'rare' as const,
        trigger: () => Math.random() < 0.12
      }
    ];

    const availableEvents = events.filter(event => event.trigger());
    if (availableEvents.length === 0) return null;

    const selectedEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)];
    
    return {
      id: Date.now().toString(),
      title: selectedEvent.title,
      description: selectedEvent.description,
      type: selectedEvent.type,
      effect: selectedEvent.effect,
      duration: selectedEvent.duration,
      reward: selectedEvent.reward,
      penalty: selectedEvent.penalty,
      icon: selectedEvent.icon,
      rarity: selectedEvent.rarity
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeEvents.length < 3) { // Max 3 active events
        const newEvent = generateEvent();
        if (newEvent) {
          setActiveEvents(prev => [...prev, newEvent]);
          
          // Auto-remove event after duration or based on rarity
          const autoRemoveTime = newEvent.duration || 
            (newEvent.rarity === 'legendary' ? 45000 : 
             newEvent.rarity === 'epic' ? 35000 :
             newEvent.rarity === 'rare' ? 25000 : 20000);
             
          setTimeout(() => {
            setActiveEvents(prev => prev.filter(e => e.id !== newEvent.id));
          }, autoRemoveTime);
        }
      }
    }, Math.random() * 20000 + 10000); // Random interval between 10-30 seconds

    return () => clearInterval(interval);
  }, [playerCash, playerLevel, activeEvents.length]);

  const handleEventAction = (eventId: string, action: 'accept' | 'dismiss') => {
    onEventAction(eventId, action);
    setActiveEvents(prev => prev.filter(e => e.id !== eventId));
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 via-orange-500 to-red-500';
      case 'epic': return 'from-purple-500 via-pink-500 to-indigo-600';
      case 'rare': return 'from-blue-500 via-cyan-500 to-teal-500';
      default: return 'from-green-500 via-emerald-500 to-lime-500';
    }
  };

  if (activeEvents.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      {activeEvents.map((event) => (
        <Card
          key={event.id}
          className={`bg-gradient-to-r ${getRarityColor(event.rarity)} text-white shadow-2xl animate-scale-in border-4 border-yellow-300 backdrop-blur-sm`}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-2xl animate-bounce">{event.icon}</span>
                <Badge className="bg-white/30 text-white border-white/50 text-xs">
                  {event.rarity.toUpperCase()}
                </Badge>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEventAction(event.id, 'dismiss')}
                className="text-white hover:bg-white/20 p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm border border-white/30">
              <h3 className="font-bold text-yellow-200 text-sm">{event.title}</h3>
              <p className="text-xs text-white/90 mb-2">{event.description}</p>
              <Badge variant="secondary" className="bg-white/30 text-white border-white/50 text-xs">
                <span className="animate-pulse">⚡</span> {event.effect}
              </Badge>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => handleEventAction(event.id, 'accept')}
                size="sm"
                className={`flex-1 font-bold text-xs ${
                  event.type === 'crash' || event.penalty
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                <Gift className="w-3 h-3 mr-1" />
                {event.type === 'crash' ? 'Brace!' : 
                 event.type === 'challenge' ? 'Accept!' : 'Let\'s Go!'}
              </Button>
              <Button
                onClick={() => handleEventAction(event.id, 'dismiss')}
                size="sm"
                variant="outline"
                className="text-white border-white hover:bg-white/20 text-xs"
              >
                Pass
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GameEvents;
