
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
  memes: Array<{
    id: string;
    name: string;
    symbol: string;
    currentPrice: number;
    change24h: number;
  }>;
}

const MarketNews = ({ memeNames, memes }: MarketNewsProps) => {
  const [news, setNews] = useState<NewsItem[]>([]);

  const generateMemeSpecificNews = () => {
    const memeNewsTemplates = [
      // Skibidi Toilet News
      {
        memeId: '1',
        positive: [
          {
            title: "🚽 Skibidi Toilet hits 50 billion views milestone!",
            description: "The viral series breaks all-time records, causing massive investor confidence surge",
            category: "Milestone Achievement"
          },
          {
            title: "🎬 Hollywood studios bid for Skibidi Toilet movie rights",
            description: "Major film studios competing for adaptation rights, driving speculation",
            category: "Entertainment Industry"
          }
        ],
        negative: [
          {
            title: "📺 YouTube considers Skibidi Toilet content restrictions",
            description: "Platform policy changes threaten future episodes, investors panic selling",
            category: "Platform Risk"
          },
          {
            title: "🏫 Schools ban Skibidi Toilet references, cultural shift detected",
            description: "Educational institutions crackdown reduces mainstream adoption",
            category: "Cultural Backlash"
          }
        ]
      },
      // Ohio Sigma News
      {
        memeId: '2',
        positive: [
          {
            title: "🗿 Ohio becomes official meme capital of America",
            description: "State government embraces meme culture, tourism surge expected",
            category: "Government Support"
          },
          {
            title: "💪 Sigma mindset courses launch in universities",
            description: "Academic institutions adopting sigma philosophy drives legitimacy",
            category: "Educational Adoption"
          }
        ],
        negative: [
          {
            title: "📉 Ohio meme fatigue detected in Gen Alpha surveys",
            description: "Youth culture research shows declining interest in Ohio references",
            category: "Trend Analysis"
          },
          {
            title: "🚫 Anti-sigma movement gains momentum on social media",
            description: "Counter-culture backlash threatens sigma grindset popularity",
            category: "Cultural Shift"
          }
        ]
      },
      // Rizz Level News
      {
        memeId: '3',
        positive: [
          {
            title: "💕 Dating apps integrate 'Rizz Score' feature",
            description: "Major platforms adopt rizz metrics, mainstream validation achieved",
            category: "Tech Integration"
          },
          {
            title: "🎓 Harvard study confirms rizz correlation with success",
            description: "Academic research validates rizz culture, institutional backing grows",
            category: "Academic Research"
          }
        ],
        negative: [
          {
            title: "💔 'Toxic Rizz' controversy erupts across platforms",
            description: "Critics claim rizz culture promotes harmful dating behaviors",
            category: "Social Controversy"
          }
        ]
      },
      // Gyatt Moment News
      {
        memeId: '4',
        positive: [
          {
            title: "🍑 Gyatt becomes Oxford Dictionary word of the year candidate",
            description: "Linguistic recognition drives cultural legitimacy and adoption",
            category: "Language Evolution"
          }
        ],
        negative: [
          {
            title: "🚫 TikTok algorithms suppress gyatt content",
            description: "Platform content policies target gyatt usage, reducing visibility",
            category: "Algorithm Changes"
          },
          {
            title: "👥 Parents' groups launch anti-gyatt campaigns",
            description: "Conservative backlash threatens mainstream acceptance",
            category: "Cultural Opposition"
          }
        ]
      },
      // Fanum Tax News
      {
        memeId: '5',
        positive: [
          {
            title: "🍟 McDonald's launches 'Fanum Tax' meal promotion",
            description: "Fast food giant embraces meme culture in major marketing campaign",
            category: "Corporate Adoption"
          },
          {
            title: "💰 Fanum's streaming revenue hits all-time high",
            description: "Original creator's success validates the entire ecosystem",
            category: "Creator Economy"
          }
        ],
        negative: [
          {
            title: "📉 Fanum Tax usage drops 40% in younger demographics",
            description: "Newer slang terms replace Fanum Tax in Gen Alpha vocabulary",
            category: "Trend Decline"
          }
        ]
      },
      // NPC Stream News
      {
        memeId: '6',
        positive: [
          {
            title: "🤖 NPC streaming becomes billion-dollar industry",
            description: "Meta-analysis shows NPC streams generate massive revenue streams",
            category: "Industry Growth"
          },
          {
            title: "🎭 Broadway considers NPC-inspired theatrical productions",
            description: "High culture adoption signals mainstream breakthrough",
            category: "Cultural Elevation"
          }
        ],
        negative: [
          {
            title: "🧠 Psychologists warn of NPC behavior normalization",
            description: "Mental health experts raise concerns about societal implications",
            category: "Health Concerns"
          },
          {
            title: "📱 TikTok limits NPC stream monetization",
            description: "Platform policy changes threaten creator earnings potential",
            category: "Monetization Risk"
          }
        ]
      },
      // Sigma Grindset News
      {
        memeId: '7',
        positive: [
          {
            title: "💪 Fortune 500 CEOs endorse sigma grindset philosophy",
            description: "Corporate leadership adoption drives institutional validation",
            category: "Business Leadership"
          },
          {
            title: "📚 Sigma grindset self-help books top bestseller lists",
            description: "Publishing industry success indicates mainstream appeal",
            category: "Publishing Success"
          }
        ],
        negative: [
          {
            title: "⚠️ Medical experts link sigma culture to burnout epidemic",
            description: "Health professionals warn against toxic productivity culture",
            category: "Health Warning"
          }
        ]
      },
      // Grimace Shake News
      {
        memeId: '8',
        positive: [
          {
            title: "🟣 McDonald's extends Grimace Shake availability globally",
            description: "Massive corporate investment shows sustained confidence in trend",
            category: "Corporate Investment"
          }
        ],
        negative: [
          {
            title: "💜 Grimace Shake trend declared 'dead' by TikTok influencers",
            description: "Top creators move on to newer food trends, abandoning Grimace",
            category: "Influencer Shift"
          },
          {
            title: "🏥 Health concerns raised over Grimace Shake ingredients",
            description: "Food safety investigations damage brand reputation",
            category: "Health Concerns"
          }
        ]
      },
      // Smurf Cat News
      {
        memeId: '9',
        positive: [
          {
            title: "😺 Smurf Cat merchandise sales exceed $50 million",
            description: "Retail success demonstrates strong commercial viability",
            category: "Commercial Success"
          },
          {
            title: "🎵 Smurf Cat song hits #1 on global viral charts",
            description: "Music industry recognition drives cross-platform growth",
            category: "Music Success"
          }
        ],
        negative: [
          {
            title: "⚖️ Sony claims copyright infringement on Smurf Cat",
            description: "Legal challenges threaten the entire Smurf Cat ecosystem",
            category: "Legal Issues"
          }
        ]
      },
      // Bing Chilling News
      {
        memeId: '10',
        positive: [
          {
            title: "🍦 Chinese social media platforms embrace Bing Chilling",
            description: "Cross-cultural acceptance opens massive Asian markets",
            category: "International Expansion"
          }
        ],
        negative: [
          {
            title: "❄️ Bing Chilling loses relevance as John Cena controversy fades",
            description: "Original context forgotten, reducing cultural significance",
            category: "Context Loss"
          },
          {
            title: "💬 Anti-China sentiment affects Bing Chilling popularity",
            description: "Geopolitical tensions reduce international meme appeal",
            category: "Political Risk"
          }
        ]
      },
      // Alpha Male News
      {
        memeId: '11',
        positive: [
          {
            title: "🦁 Alpha Male lifestyle brands secure $200M funding",
            description: "Venture capital investment validates alpha culture economy",
            category: "Investment News"
          }
        ],
        negative: [
          {
            title: "🚫 Alpha Male content flagged for promoting toxic masculinity",
            description: "Platform moderation threatens alpha culture monetization",
            category: "Content Moderation"
          },
          {
            title: "📊 Studies link alpha obsession to mental health issues",
            description: "Academic research reveals negative psychological impacts",
            category: "Research Findings"
          }
        ]
      },
      // Based Take News
      {
        memeId: '12',
        positive: [
          {
            title: "🧠 'Based' officially added to Merriam-Webster dictionary",
            description: "Linguistic legitimacy drives institutional acceptance",
            category: "Language Recognition"
          },
          {
            title: "🎯 Based Take becomes preferred format for political discourse",
            description: "Politicians adopt based terminology in official communications",
            category: "Political Adoption"
          }
        ],
        negative: [
          {
            title: "🔥 Based culture accused of promoting polarization",
            description: "Social scientists warn of echo chamber reinforcement",
            category: "Social Science"
          }
        ]
      }
    ];

    // Find a random meme template
    const randomMemeTemplate = memeNewsTemplates[Math.floor(Math.random() * memeNewsTemplates.length)];
    const meme = memes.find(m => m.id === randomMemeTemplate.memeId);
    if (!meme) return null;

    // Determine if news should be positive or negative based on meme performance
    const isPositive = meme.change24h > 0 ? Math.random() < 0.7 : Math.random() < 0.3;
    const newsPool = isPositive ? randomMemeTemplate.positive : randomMemeTemplate.negative;
    
    if (!newsPool || newsPool.length === 0) return null;
    
    const selectedNews = newsPool[Math.floor(Math.random() * newsPool.length)];
    
    return {
      ...selectedNews,
      id: Date.now().toString(),
      timestamp: new Date(),
      impact: isPositive ? 'positive' as const : 'negative' as const,
      memeId: randomMemeTemplate.memeId
    };
  };

  const generateMarketNews = () => {
    const marketNewsTemplates = [
      {
        title: "📊 Meme market volatility reaches historic levels",
        impact: 'neutral' as const,
        description: "Analysts report unprecedented price swings across all meme categories",
        category: "Market Analysis"
      },
      {
        title: "🏦 Major banks consider meme portfolio inclusion",
        impact: 'positive' as const,
        description: "Traditional finance institutions evaluate meme market legitimacy",
        category: "Institutional Interest"
      },
      {
        title: "⚡ Lightning-fast meme lifecycle accelerates market dynamics",
        impact: 'neutral' as const,
        description: "Viral content lifespan shrinks, increasing trading frequency",
        category: "Market Dynamics"
      },
      {
        title: "🌍 Global meme economy surpasses $10 billion valuation",
        impact: 'positive' as const,
        description: "International recognition drives massive market expansion",
        category: "Global Economy"
      },
      {
        title: "🔍 Regulatory bodies investigate meme market manipulation",
        impact: 'negative' as const,
        description: "Government oversight threatens unregulated meme trading",
        category: "Regulatory Risk"
      }
    ];

    const randomTemplate = marketNewsTemplates[Math.floor(Math.random() * marketNewsTemplates.length)];
    
    return {
      ...randomTemplate,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
  };

  useEffect(() => {
    // Generate initial news
    const initialNews = [
      generateMemeSpecificNews(),
      generateMarketNews(),
      generateMemeSpecificNews(),
      generateMarketNews()
    ].filter(Boolean);
    
    setNews(initialNews);

    // Generate new news every 45 seconds (less frequent)
    const interval = setInterval(() => {
      setNews(prev => {
        const newItem = Math.random() < 0.7 ? generateMemeSpecificNews() : generateMarketNews();
        if (!newItem) return prev;
        const updated = [newItem, ...prev].slice(0, 12); // Keep last 12 news items
        return updated;
      });
    }, 45000);

    return () => clearInterval(interval);
  }, [memes]);

  return (
    <Card className="h-96 overflow-hidden shadow-2xl border-4 border-blue-200">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          📰 Meme Market Intelligence Feed
          <span className="text-yellow-200">📈</span>
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
                    item.impact === 'positive' ? 'bg-green-500 text-white' :
                    item.impact === 'negative' ? 'bg-red-500 text-white' :
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
