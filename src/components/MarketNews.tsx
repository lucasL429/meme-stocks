
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
  category: string;
}

interface MarketNewsProps {
  memeNames: { [key: string]: string };
}

const MarketNews = ({ memeNames }: MarketNewsProps) => {
  const [news, setNews] = useState<NewsItem[]>([]);

  const generateNews = () => {
    const templates = [
      // Animal Memes News
      {
        title: "🐕 Doge Classic breaks internet again!",
        impact: 'positive' as const,
        memeId: '1',
        description: "Much wow! Doge Classic hits trending on all social platforms",
        category: "Animal Memes"
      },
      {
        title: "🐸 Pepe Premium gets celebrity endorsement",
        impact: 'positive' as const,
        memeId: '2',
        description: "A-list celebrity posts rare Pepe, community goes wild",
        category: "Classic Memes"
      },
      {
        title: "😾 Grumpy Cat legacy continues to grow",
        impact: 'positive' as const,
        memeId: '9',
        description: "New documentary about Grumpy Cat boosts investor confidence",
        category: "Animal Memes"
      },

      // Reaction Memes News
      {
        title: "😭 Wojak Wisdom community rally",
        impact: 'positive' as const,
        memeId: '3',
        description: "Wojak holders organize massive 'feel good' campaign",
        category: "Reaction Memes"
      },
      {
        title: "😤 Woman Yelling at Cat meme goes viral again",
        impact: 'positive' as const,
        memeId: '12',
        description: "New template variations flood social media",
        category: "Reaction Memes"
      },

      // Finance & Success Memes
      {
        title: "📈 Stonks Supreme meme format explodes",
        impact: 'positive' as const,
        memeId: '5',
        description: "Wall Street adopts 'stonks' terminology officially",
        category: "Finance Memes"
      },
      {
        title: "👶 Success Kid celebrates 15th anniversary",
        impact: 'positive' as const,
        memeId: '10',
        description: "Original Success Kid photo owner announces special NFT drop",
        category: "Success Memes"
      },

      // Character Memes
      {
        title: "💪 Chad Coin influencer partnership",
        impact: 'positive' as const,
        memeId: '4',
        description: "Top fitness influencer promotes Chad lifestyle to millions",
        category: "Viral Characters"
      },
      {
        title: "🦆 Drake meme template gets official recognition",
        impact: 'positive' as const,
        memeId: '6',
        description: "Drake himself acknowledges the meme's cultural impact",
        category: "Choice Memes"
      },

      // Intellectual & Think Memes
      {
        title: "🧠 Galaxy Brain meme reaches universities",
        impact: 'positive' as const,
        memeId: '7',
        description: "Psychology professors use Galaxy Brain in actual lectures",
        category: "Intellectual Memes"
      },
      {
        title: "🤔 Roll Safe thinking gains academic attention",
        impact: 'positive' as const,
        memeId: '11',
        description: "Philosophy students embrace Roll Safe wisdom",
        category: "Think Memes"
      },

      // Situation Memes
      {
        title: "🔥 'This is Fine' perfectly captures 2024",
        impact: 'positive' as const,
        memeId: '8',
        description: "News outlets use 'This is Fine' dog in climate reports",
        category: "Situation Memes"
      },

      // Market Events
      {
        title: "⚠️ Meme market volatility warning issued",
        impact: 'negative' as const,
        description: "Analysts predict increased volatility due to viral trends",
        category: "Market Analysis"
      },
      {
        title: "🚀 Total meme market cap hits new records",
        impact: 'positive' as const,
        description: "Combined meme cryptocurrency market exceeds all expectations",
        category: "Market Analysis"
      },
      {
        title: "📱 New meme trading app launches",
        impact: 'neutral' as const,
        description: "Competition intensifies in mobile meme trading space",
        category: "Technology"
      },
      {
        title: "💎 Diamond hands movement gains momentum",
        impact: 'positive' as const,
        description: "Long-term meme holders report significant gains",
        category: "Community"
      },
      {
        title: "🌙 Late night trading volumes surge",
        impact: 'neutral' as const,
        description: "Global meme markets see 24/7 activity increase",
        category: "Market Trends"
      },
      {
        title: "🎪 Meme festival announced for next month",
        impact: 'positive' as const,
        description: "First-ever physical meme convention to feature trading floor",
        category: "Events"
      },
      {
        title: "🤡 'Clown market' sentiment spreads",
        impact: 'negative' as const,
        description: "Traders report confusion over random price movements",
        category: "Market Sentiment"
      },
      {
        title: "🏆 Professional meme traders earn millions",
        impact: 'positive' as const,
        description: "Success stories inspire new generation of meme investors",
        category: "Success Stories"
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
    const initialNews = [generateNews(), generateNews(), generateNews(), generateNews()];
    setNews(initialNews);

    // Generate new news every 20 seconds
    const interval = setInterval(() => {
      setNews(prev => {
        const newItem = generateNews();
        const updated = [newItem, ...prev].slice(0, 15); // Keep last 15 news items
        return updated;
      });
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-96 overflow-hidden shadow-2xl border-4 border-blue-200">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 animate-pulse" />
          📰 Meme Market News Feed
          <span className="text-yellow-200 animate-bounce">🔥</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-80 overflow-y-auto bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="space-y-3 p-4">
          {news.map((item) => (
            <div
              key={item.id}
              className="p-4 border-2 rounded-xl hover:bg-gradient-to-r hover:from-yellow-50 hover:to-pink-50 transition-all duration-300 shadow-lg border-purple-200 bg-white"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-bold flex-1 text-gray-800">{item.title}</h4>
                <Badge
                  variant={item.impact === 'positive' ? 'default' : item.impact === 'negative' ? 'destructive' : 'secondary'}
                  className={`ml-2 flex items-center gap-1 text-xs font-bold ${
                    item.impact === 'positive' ? 'bg-green-500 text-white animate-pulse' :
                    item.impact === 'negative' ? 'bg-red-500 text-white animate-pulse' :
                    'bg-gray-400 text-white'
                  }`}
                >
                  {item.impact === 'positive' && <TrendingUp className="w-3 h-3" />}
                  {item.impact === 'negative' && <TrendingDown className="w-3 h-3" />}
                  {item.impact === 'neutral' && <AlertCircle className="w-3 h-3" />}
                  {item.impact}
                </Badge>
              </div>
              <p className="text-xs text-gray-700 mb-2 font-medium">{item.description}</p>
              <div className="flex justify-between items-center">
                <Badge variant="outline" className="text-xs bg-purple-100 text-purple-700 border-purple-300">
                  📂 {item.category}
                </Badge>
                <p className="text-xs text-gray-500 font-mono">
                  ⏰ {item.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketNews;
