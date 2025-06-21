
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Gift, TrendingUp, Zap } from 'lucide-react';

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  type: 'bonus' | 'market_boost' | 'discount' | 'challenge';
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
        title: "🎉 Welcome Bonus",
        description: "Start your journey with extra cash!",
        type: 'bonus' as const,
        effect: "Receive $500 bonus",
        reward: 500,
        icon: "🎁",
        trigger: () => playerCash < 15000 && playerLevel === 1
      },
      {
        title: "⚡ Market Flash Sale",
        description: "All trading fees reduced by 50%!",
        type: 'discount' as const,
        effect: "Reduced trading fees for 5 minutes",
        duration: 300000,
        icon: "💸",
        trigger: () => Math.random() < 0.3
      },
      {
        title: "🚀 Meme Mania Hour",
        description: "All meme prices fluctuate more rapidly!",
        type: 'market_boost' as const,
        effect: "Increased price volatility",
        duration: 180000,
        icon: "📈",
        trigger: () => Math.random() < 0.2
      },
      {
        title: "💎 Diamond Hands Challenge",
        description: "Hold any meme for 2 minutes for bonus cash!",
        type: 'challenge' as const,
        effect: "Complete for $1000 reward",
        reward: 1000,
        icon: "💎",
        trigger: () => playerLevel >= 2 && Math.random() < 0.25
      },
      {
        title: "🌟 Level Up Bonus",
        description: "Congratulations on reaching a new level!",
        type: 'bonus' as const,
        effect: `Receive $${playerLevel * 500} level bonus`,
        reward: playerLevel * 500,
        icon: "⭐",
        trigger: () => playerLevel > 1 && Math.random() < 0.4
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
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl animate-scale-in"
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-2xl">{event.icon}</span>
                Event Alert!
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
            <div>
              <h3 className="font-bold">{event.title}</h3>
              <p className="text-sm text-purple-100">{event.description}</p>
            </div>
            
            <Badge variant="secondary" className="bg-white/20 text-white">
              {event.effect}
            </Badge>

            <div className="flex gap-2">
              <Button
                onClick={() => handleEventAction(event.id, 'accept')}
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white flex-1"
              >
                <Gift className="w-3 h-3 mr-1" />
                Accept
              </Button>
              <Button
                onClick={() => handleEventAction(event.id, 'dismiss')}
                size="sm"
                variant="outline"
                className="text-white border-white hover:bg-white/20"
              >
                Later
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GameEvents;
