
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Gift, TrendingUp, Zap, AlertTriangle } from 'lucide-react';

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  type: 'bonus' | 'market_boost' | 'discount' | 'challenge' | 'crash' | 'surge' | 'chaos' | 'regulatory' | 'viral' | 'whale' | 'market_crash';
  effect: string;
  duration?: number;
  reward?: number;
  penalty?: number;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'catastrophic';
}

interface GameEventsProps {
  playerCash: number;
  playerLevel: number;
  onEventAction: (eventId: string, action: 'accept' | 'dismiss', eventType?: string) => void;
}

const GameEvents = ({ playerCash, playerLevel, onEventAction }: GameEventsProps) => {
  const [activeEvents, setActiveEvents] = useState<GameEvent[]>([]);

  const generateEvent = (): GameEvent | null => {
    const marketSentiment = Math.random();
    
    const majorEvents = [
      // Catastrophic Market Events
      {
        title: "💥 TOTAL MARKET MELTDOWN",
        description: "Breaking: Social media algorithms change everything!",
        type: 'market_crash' as const,
        effect: "ALL meme prices crash 70-90% for 8 minutes",
        duration: 480000,
        penalty: 0,
        icon: "💀",
        rarity: 'catastrophic' as const,
        trigger: () => Math.random() < 0.03 // 3% chance
      },
      {
        title: "🌪️ PLATFORM APOCALYPSE",
        description: "TikTok servers worldwide experience massive outage!",
        type: 'market_crash' as const,
        effect: "TikTok-related memes lose 80% value instantly",
        duration: 360000,
        penalty: 0,
        icon: "📱💥",
        rarity: 'catastrophic' as const,
        trigger: () => Math.random() < 0.02
      },

      // Legendary Events
      {
        title: "👑 MEME KING CORONATION",
        description: "The internet has chosen its ultimate meme ruler!",
        type: 'surge' as const,
        effect: "One random meme becomes KING (+500% value)",
        duration: 600000,
        icon: "👑",
        rarity: 'legendary' as const,
        trigger: () => Math.random() < 0.04
      },
      {
        title: "🚀 ELON MUSK MEME MARATHON",
        description: "Elon declares 24-hour meme posting spree!",
        type: 'market_boost' as const,
        effect: "ALL memes surge 100-200% for 10 minutes",
        duration: 600000,
        icon: "🚀",
        rarity: 'legendary' as const,
        trigger: () => Math.random() < 0.03
      },
      {
        title: "🎭 HOLLYWOOD MEME MOVIE DEAL",
        description: "Marvel announces meme cinematic universe!",
        type: 'viral' as const,
        effect: "Character memes explode +300% value",
        duration: 720000,
        icon: "🎬",
        rarity: 'legendary' as const,
        trigger: () => Math.random() < 0.035
      },

      // Epic Events
      {
        title: "📺 SUPER BOWL MEME COMMERCIAL",
        description: "Memes get prime time advertising during Super Bowl!",
        type: 'market_boost' as const,
        effect: "All memes get massive exposure boost +150%",
        duration: 480000,
        icon: "🏈",
        rarity: 'epic' as const,
        trigger: () => playerLevel >= 5 && Math.random() < 0.06
      },
      {
        title: "🏛️ GOVERNMENT REGULATION THREAT",
        description: "Congress considers 'Meme Market Regulation Act'",
        type: 'regulatory' as const,
        effect: "Regulatory fear causes 40% market decline",
        duration: 420000,
        penalty: 2000,
        icon: "⚖️",
        rarity: 'epic' as const,
        trigger: () => Math.random() < 0.05
      },
      {
        title: "🤖 AI MEME GENERATOR REVOLUTION",
        description: "Advanced AI creates infinite perfect memes!",
        type: 'chaos' as const,
        effect: "Extreme volatility: ±200% price swings",
        duration: 360000,
        icon: "🤖",
        rarity: 'epic' as const,
        trigger: () => Math.random() < 0.07
      },

      // Rare Events
      {
        title: "🎪 MEMECON 2024 ANNOUNCEMENT",
        description: "First ever international meme convention announced!",
        type: 'market_boost' as const,
        effect: "Convention hype boosts all memes +75%",
        duration: 300000,
        icon: "🎪",
        rarity: 'rare' as const,
        trigger: () => Math.random() < 0.08
      },
      {
        title: "💎 DIAMOND HANDS MOVEMENT",
        description: "Viral trend encourages long-term meme holding!",
        type: 'challenge' as const,
        effect: "Hold ALL positions for 5 minutes = $8000 bonus",
        reward: 8000,
        duration: 300000,
        icon: "💎",
        rarity: 'rare' as const,
        trigger: () => playerLevel >= 3 && Math.random() < 0.1
      },
      {
        title: "🐋 WHALE ALERT: MASSIVE BUYER",
        description: "Crypto billionaire enters meme market!",
        type: 'whale' as const,
        effect: "Random meme gets whale pump +250%",
        duration: 240000,
        icon: "🐋",
        rarity: 'rare' as const,
        trigger: () => playerCash > 30000 && Math.random() < 0.09
      },

      // Major News Events
      {
        title: "📱 TIKTOK ALGORITHM UPDATE",
        description: "Major algorithm changes affect meme visibility!",
        type: 'chaos' as const,
        effect: "Random memes winners (+150%) and losers (-60%)",
        duration: 300000,
        icon: "📱",
        rarity: 'epic' as const,
        trigger: () => Math.random() < 0.08
      },
      {
        title: "🌍 GLOBAL MEME DAY DECLARED",
        description: "UN officially recognizes International Meme Day!",
        type: 'market_boost' as const,
        effect: "Global celebration boosts all memes +120%",
        duration: 480000,
        icon: "🌍",
        rarity: 'epic' as const,
        trigger: () => Math.random() < 0.06
      }
    ];

    const availableEvents = majorEvents.filter(event => event.trigger());
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
      if (activeEvents.length < 2) { // Max 2 active events (these are major)
        const newEvent = generateEvent();
        if (newEvent) {
          setActiveEvents(prev => [...prev, newEvent]);
          
          // Auto-remove event after duration
          const autoRemoveTime = newEvent.duration || 
            (newEvent.rarity === 'catastrophic' ? 60000 :
             newEvent.rarity === 'legendary' ? 50000 : 
             newEvent.rarity === 'epic' ? 40000 :
             30000);
             
          setTimeout(() => {
            setActiveEvents(prev => prev.filter(e => e.id !== newEvent.id));
          }, autoRemoveTime);
        }
      }
    }, Math.random() * 60000 + 120000); // Random interval between 2-3 minutes (much less frequent)

    return () => clearInterval(interval);
  }, [playerCash, playerLevel, activeEvents.length]);

  const handleEventAction = (eventId: string, action: 'accept' | 'dismiss') => {
    const event = activeEvents.find(e => e.id === eventId);
    onEventAction(eventId, action, event?.type);
    setActiveEvents(prev => prev.filter(e => e.id !== eventId));
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'catastrophic': return 'from-black via-red-900 to-red-600 animate-pulse';
      case 'legendary': return 'from-yellow-400 via-orange-500 to-red-500 animate-pulse';
      case 'epic': return 'from-purple-500 via-pink-500 to-indigo-600';
      case 'rare': return 'from-blue-500 via-cyan-500 to-teal-500';
      default: return 'from-green-500 via-emerald-500 to-lime-500';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'catastrophic': return 'border-red-500 shadow-red-500/50 shadow-2xl';
      case 'legendary': return 'border-yellow-400 shadow-yellow-400/50 shadow-2xl';
      case 'epic': return 'border-purple-400 shadow-purple-400/50 shadow-xl';
      case 'rare': return 'border-blue-400 shadow-blue-400/50 shadow-lg';
      default: return 'border-green-400';
    }
  };

  if (activeEvents.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-4 max-w-md">
      {activeEvents.map((event) => (
        <Card
          key={event.id}
          className={`bg-gradient-to-r ${getRarityColor(event.rarity)} text-white backdrop-blur-sm border-4 ${getRarityBorder(event.rarity)} transform hover:scale-105 transition-all duration-300`}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-3xl animate-bounce">{event.icon}</span>
                <Badge className={`text-white border-white/50 text-xs font-black ${
                  event.rarity === 'catastrophic' ? 'bg-red-900/80' :
                  event.rarity === 'legendary' ? 'bg-yellow-600/80' :
                  event.rarity === 'epic' ? 'bg-purple-600/80' :
                  'bg-blue-600/80'
                }`}>
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
          <CardContent className="space-y-4">
            <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-white/30">
              <h3 className="font-black text-yellow-200 text-sm mb-2">{event.title}</h3>
              <p className="text-xs text-white/90 mb-3 font-semibold">{event.description}</p>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/50 text-xs font-bold">
                <span className="animate-pulse">⚡</span> {event.effect}
              </Badge>
              {event.duration && (
                <div className="mt-2">
                  <Badge className="bg-orange-500/80 text-white text-xs">
                    ⏱️ {Math.floor(event.duration / 60000)} minutes
                  </Badge>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => handleEventAction(event.id, 'accept')}
                size="sm"
                className={`flex-1 font-black text-xs ${
                  event.type === 'market_crash' || event.penalty
                    ? 'bg-red-600 hover:bg-red-700 text-white border-2 border-red-300'
                    : 'bg-green-600 hover:bg-green-700 text-white border-2 border-green-300'
                } transform hover:scale-105 transition-all`}
              >
                <Gift className="w-3 h-3 mr-1" />
                {event.type === 'market_crash' ? '💀 WITNESS!' : 
                 event.type === 'challenge' ? '💪 ACCEPT!' : 
                 '🚀 UNLEASH!'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GameEvents;
