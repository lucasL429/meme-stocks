
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

export interface NewsItem {
  id: string;
  title: string;
  impact: 'positive' | 'negative' | 'neutral';
  memeId?: string;
  timestamp: Date;
  description: string;
}

interface MarketNewsProps {
  memeNames: { [key: string]: string };
}

const MarketNews = ({ memeNames }: MarketNewsProps) => {
  const [news, setNews] = useState<NewsItem[]>([]);

  const generateNews = () => {
    const templates = [
      {
        title: "🐕 Doge Classic trending on social media!",
        impact: 'positive' as const,
        memeId: '1',
        description: "Massive surge in Doge Classic discussions across platforms"
      },
      {
        title: "🐸 Pepe Premium partnership announced",
        impact: 'positive' as const,
        memeId: '2',
        description: "Major crypto exchange adds Pepe Premium support"
      },
      {
        title: "😭 Wojak Wisdom community rally",
        impact: 'positive' as const,
        memeId: '3',
        description: "Wojak holders organize massive buying campaign"
      },
      {
        title: "💪 Chad Coin influencer endorsement",
        impact: 'positive' as const,
        memeId: '4',
        description: "Top fitness influencer promotes Chad Coin to millions"
      },
      {
        title: "📈 Stonks Supreme meme goes viral",
        impact: 'positive' as const,
        memeId: '5',
        description: "New Stonks meme format breaks internet records"
      },
      {
        title: "⚠️ Market volatility warning issued",
        impact: 'negative' as const,
        description: "Analysts predict increased volatility in meme markets"
      },
      {
        title: "🚀 Meme market cap reaches new highs",
        impact: 'positive' as const,
        description: "Total meme cryptocurrency market exceeds expectations"
      },
      {
        title: "📱 New meme trading app launches",
        impact: 'neutral' as const,
        description: "Competition heats up in meme trading space"
      }
    ];

    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    
    return {
      ...randomTemplate,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
  };

  useEffect(() => {
    // Generate initial news
    const initialNews = [generateNews(), generateNews(), generateNews()];
    setNews(initialNews);

    // Generate new news every 30 seconds
    const interval = setInterval(() => {
      setNews(prev => {
        const newItem = generateNews();
        const updated = [newItem, ...prev].slice(0, 10); // Keep last 10 news items
        return updated;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-80 overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Market News
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-64 overflow-y-auto">
        <div className="space-y-2 p-4">
          {news.map((item) => (
            <div
              key={item.id}
              className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-medium flex-1">{item.title}</h4>
                <Badge
                  variant={item.impact === 'positive' ? 'default' : item.impact === 'negative' ? 'destructive' : 'secondary'}
                  className="ml-2 flex items-center gap-1 text-xs"
                >
                  {item.impact === 'positive' && <TrendingUp className="w-3 h-3" />}
                  {item.impact === 'negative' && <TrendingDown className="w-3 h-3" />}
                  {item.impact === 'neutral' && <AlertCircle className="w-3 h-3" />}
                  {item.impact}
                </Badge>
              </div>
              <p className="text-xs text-gray-600 mb-1">{item.description}</p>
              <p className="text-xs text-gray-400">
                {item.timestamp.toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketNews;
