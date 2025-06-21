
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Gift, TrendingUp, Zap, AlertTriangle } from 'lucide-react';

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  type: 'bonus' | 'market_boost' | 'discount' | 'challenge' | 'crash' | 'surge';
  effect: string;
  duration?: number;
  reward?: number;
  icon: string;
}

interface GameEventsProps {
  playerCash: number;
  playerLevel: number;
  onEventAction: (eventId: string, action: 'accept' | 'dismiss') => void;
}

const GameEvents = ({ playerCash, playerLevel, onEventAction }: GameEventsProps) => {
  const [activeEvents, setActiveEvents] = useState<GameEvent[]>([]);

  const generateEvent = (): GameEvent | null => {
    const events = [
      {
        title: "🎉 Rookie Trader Bonus",
        description: "Welcome to the meme market! Here's some starter cash!",
        type: 'bonus' as const,
        effect: "Receive $500 bonus cash",
        reward: 500,
        icon: "🎁",
        trigger: () => playerCash < 15000 && playerLevel === 1
      },
      {
        title: "⚡ Speed Trading Hour",
        description: "Lightning fast trades with zero fees!",
        type: 'discount' as const,
        effect: "No trading fees for 5 minutes",
        duration: 300000,
        icon: "💸",
        trigger: () => Math.random() < 0.25
      },
      {
        title: "🚀 Meme Mania Mode",
        description: "All memes are going absolutely viral!",
        type: 'market_boost' as const,
        effect: "Massive price swings for 3 minutes",
        duration: 180000,
        icon: "📈",
        trigger: () => Math.random() < 0.2
      },
      {
        title: "💎 Diamond Hands Challenge",
        description: "HODL any meme for 2 minutes for a big reward!",
        type: 'challenge' as const,
        effect: "Complete for $1000 reward",
        reward: 1000,
        icon: "💎",
        trigger: () => playerLevel >= 2 && Math.random() < 0.3
      },
      {
        title: "🌟 Level Up Celebration",
        description: "Congratulations on leveling up, legend!",
        type: 'bonus' as const,
        effect: `Receive $${playerLevel * 500} level bonus`,
        reward: playerLevel * 500,
        icon: "⭐",
        trigger: () => playerLevel > 1 && Math.random() < 0.4
      },
      {
        title: "📱 Social Media Surge",
        description: "A viral TikTok is boosting animal memes!",
        type: 'surge' as const,
        effect: "Animal memes +20% for 4 minutes",
        duration: 240000,
        icon: "🦁",
        trigger: () => Math.random() < 0.15
      },
      {
        title: "🔥 Market Crash Alert!",
        description: "PANIC! All memes are crashing hard!",
        type: 'crash' as const,
        effect: "All prices drop 15-30% for 2 minutes",
        duration: 120000,
        icon: "📉",
        trigger: () => Math.random() < 0.1 && playerLevel >= 3
      },
      {
        title: "🎪 Meme Festival",
        description: "It's party time in the meme market!",
        type: 'market_boost' as const,
        effect: "Random memes get huge boosts",
        duration: 300000,
        icon: "🎊",
        trigger: () => Math.random() < 0.18
      },
      {
        title: "🌙 Late Night Trading",
        description: "Night owls get special bonuses!",
        type: 'bonus' as const,
        effect: "Receive $750 night trader bonus",
        reward: 750,
        icon: "🌙",
        trigger: () => new Date().getHours() >= 22 || new Date().getHours() <= 6
      },
      {
        title: "🎯 Whale Alert",
        description: "A crypto whale is buying everything!",
        type: 'surge' as const,
        effect: "All prices surge by 10-25%",
        duration: 180000,
        icon: "🐋",
        trigger: () => Math.random() < 0.12
      },
      {
        title: "🤡 Clown Market Mode",
        description: "Nothing makes sense anymore!",
        type: 'market_boost' as const,
        effect: "Completely random price movements",
        duration: 240000,
        icon: "🤡",
        trigger: () => Math.random() < 0.08
      },
      {
        title: "🏆 Big Player Bonus",
        description: "You're becoming a real meme mogul!",
        type: 'bonus' as const,
        effect: "Receive $2000 mogul bonus",
        reward: 2000,
        icon: "👑",
        trigger: () => playerLevel >= 5 && Math.random() < 0.3
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
      icon: selectedEvent.icon
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeEvents.length < 2) { // Max 2 active events
        const newEvent = generateEvent();
        if (newEvent) {
          setActiveEvents(prev => [...prev, newEvent]);
          
          // Auto-remove event after duration or 30 seconds
          setTimeout(() => {
            setActiveEvents(prev => prev.filter(e => e.id !== newEvent.id));
          }, newEvent.duration || 30000);
        }
      }
    }, 15000); // Check for new events every 15 seconds

    return () => clearInterval(interval);
  }, [playerCash, playerLevel, activeEvents.length]);

  const handleEventAction = (eventId: string, action: 'accept' | 'dismiss') => {
    onEventAction(eventId, action);
    setActiveEvents(prev => prev.filter(e => e.id !== eventId));
  };

  if (activeEvents.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-xs">
      {activeEvents.map((event) => (
        <Card
          key={event.id}
          className={`${
            event.type === 'crash' 
              ? 'bg-gradient-to-r from-red-500 to-orange-600' 
              : event.type === 'surge'
              ? 'bg-gradient-to-r from-green-500 to-emerald-600'
              : 'bg-gradient-to-r from-purple-500 to-pink-500'
          } text-white shadow-2xl animate-scale-in border-4 border-yellow-300`}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-2xl animate-bounce">{event.icon}</span>
                {event.type === 'crash' ? '🚨 ALERT!' : '🎪 Event!'}
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
            <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
              <h3 className="font-bold text-yellow-200">{event.title}</h3>
              <p className="text-sm text-white/90">{event.description}</p>
            </div>
            
            <Badge variant="secondary" className="bg-white/30 text-white border-white/50">
              <span className="animate-pulse">⚡</span> {event.effect}
            </Badge>

            <div className="flex gap-2">
              <Button
                onClick={() => handleEventAction(event.id, 'accept')}
                size="sm"
                className={`flex-1 font-bold ${
                  event.type === 'crash'
                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                <Gift className="w-3 h-3 mr-1" />
                {event.type === 'crash' ? 'Brace!' : 'Let\'s Go!'}
              </Button>
              <Button
                onClick={() => handleEventAction(event.id, 'dismiss')}
                size="sm"
                variant="outline"
                className="text-white border-white hover:bg-white/20"
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
