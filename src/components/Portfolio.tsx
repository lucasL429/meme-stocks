
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Portfolio as PortfolioType, Meme } from '@/pages/Index';

interface PortfolioProps {
  portfolio: PortfolioType;
  memes: Meme[];
}

const Portfolio = ({ portfolio, memes }: PortfolioProps) => {
  const holdings = Object.entries(portfolio.holdings).filter(([_, quantity]) => quantity > 0);
  
  const portfolioItems = holdings.map(([memeId, quantity]) => {
    const meme = memes.find(m => m.id === memeId);
    if (!meme) return null;

    const value = meme.currentPrice * quantity;
    const percentage = (value / portfolio.totalValue) * 100;

    return {
      meme,
      quantity,
      value,
      percentage,
    };
  }).filter(Boolean);

  const totalGainLoss = portfolio.totalValue - 10000; // Assuming starting amount was $10,000
  const gainLossPercentage = ((totalGainLoss / 10000) * 100);

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Portfolio Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-3xl font-bold">${portfolio.totalValue.toFixed(2)}</div>
              <div className="text-blue-100">Total Value</div>
            </div>
            <div>
              <div className="text-3xl font-bold">${portfolio.cash.toFixed(2)}</div>
              <div className="text-blue-100">Available Cash</div>
            </div>
            <div>
              <div className={`text-3xl font-bold flex items-center gap-2 ${totalGainLoss >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                {totalGainLoss >= 0 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toFixed(2)}
              </div>
              <div className="text-blue-100">
                Total Gain/Loss ({gainLossPercentage >= 0 ? '+' : ''}{gainLossPercentage.toFixed(2)}%)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Holdings */}
      <Card>
        <CardHeader>
          <CardTitle>Your Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          {portfolioItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Wallet className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No holdings yet. Start investing in some memes!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {portfolioItems.map((item) => (
                <div key={item.meme.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.meme.emoji}</span>
                    <div>
                      <div className="font-semibold">{item.meme.name}</div>
                      <div className="text-sm text-gray-500">
                        {item.quantity.toFixed(2)} shares @ ${item.meme.currentPrice.toFixed(4)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg" style={{ color: item.meme.color }}>
                      ${item.value.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.percentage.toFixed(1)}% of portfolio
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Portfolio Allocation */}
      {portfolioItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {portfolioItems.map((item) => (
                <div key={item.meme.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span>{item.meme.emoji}</span>
                      {item.meme.name}
                    </span>
                    <span>{item.percentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span>💰</span>
                    Cash
                  </span>
                  <span>{((portfolio.cash / portfolio.totalValue) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={(portfolio.cash / portfolio.totalValue) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Portfolio;
