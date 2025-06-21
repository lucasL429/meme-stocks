
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, X, TrendingUp, Wallet, ShoppingCart, Trophy, Target, Lightbulb } from 'lucide-react';

interface TutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

const Tutorial = ({ isOpen, onClose }: TutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Welcome to MemeStocks Exchange! 🚀",
      icon: "🎮",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-6xl mb-4">📱💰</div>
            <p className="text-lg font-semibold text-gray-700">
              Learn to trade viral TikTok memes and build your digital fortune!
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-xl">
            <h4 className="font-bold text-purple-800 mb-2">🎯 What You'll Learn:</h4>
            <ul className="space-y-2 text-sm text-purple-700">
              <li>• How meme markets work in the digital age</li>
              <li>• Investment strategies and risk management</li>
              <li>• Understanding market volatility and trends</li>
              <li>• Building a diversified portfolio</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Understanding Your Portfolio 💼",
      icon: "💰",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-green-100 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">$10,000</div>
              <div className="text-xs text-green-700">Starting Cash</div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">$0</div>
              <div className="text-xs text-blue-700">Holdings Value</div>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">$10,000</div>
              <div className="text-xs text-purple-700">Total Value</div>
            </div>
          </div>
          <div className="bg-yellow-100 p-4 rounded-xl">
            <Lightbulb className="w-5 h-5 text-yellow-600 inline mr-2" />
            <span className="font-bold text-yellow-800">Educational Tip:</span>
            <p className="text-yellow-700 mt-2">
              Your portfolio shows your total wealth. Cash is for buying, holdings are memes you own. 
              The goal is to grow your total portfolio value through smart investments!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "How to Trade Memes 📊",
      icon: "📈",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Trading Basics
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-200 p-3 rounded-lg">
                <div className="font-bold text-green-800">🛒 BUYING</div>
                <p className="text-xs text-green-700 mt-1">
                  Purchase meme shares when you think the price will go up
                </p>
              </div>
              <div className="bg-red-200 p-3 rounded-lg">
                <div className="font-bold text-red-800">💸 SELLING</div>
                <p className="text-xs text-red-700 mt-1">
                  Sell your shares to lock in profits or cut losses
                </p>
              </div>
            </div>
          </div>
          <div className="bg-blue-100 p-4 rounded-xl">
            <h4 className="font-bold text-blue-800 mb-2">📱 Real TikTok Data</h4>
            <p className="text-blue-700 text-sm">
              Our memes are based on actual TikTok trending data! Sports content, comedy videos, 
              relationship posts, and viral trends all have different market behaviors.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Reading Market Signals 📊",
      icon: "📉",
      content: (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border-2 border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl font-bold">🐱 Cute Cat Dude</span>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">+14.6%</span>
              </div>
            </div>
            <div className="text-lg font-bold text-gray-800">$270.00</div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <div className="font-bold text-green-800 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Green = Rising Price 📈
              </div>
              <p className="text-green-700 text-sm">Good time to consider buying or holding</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <div className="font-bold text-red-800 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 rotate-180" />
                Red = Falling Price 📉
              </div>
              <p className="text-red-700 text-sm">Might be risky to buy, consider selling</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Power-Ups & Upgrades ⚡",
      icon: "🛒",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl">
            <h4 className="font-bold text-purple-800 mb-3 flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Available Upgrades
            </h4>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg">
                <div className="font-bold text-gray-800">🔮 Market Insight</div>
                <p className="text-xs text-gray-600">Get better price predictions</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-bold text-gray-800">⚡ Fast Trading</div>
                <p className="text-xs text-gray-600">Reduce transaction fees</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-bold text-gray-800">💰 Portfolio Boost</div>
                <p className="text-xs text-gray-600">Increase starting capital</p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-100 p-4 rounded-xl">
            <Lightbulb className="w-5 h-5 text-yellow-600 inline mr-2" />
            <span className="font-bold text-yellow-800">Strategy Tip:</span>
            <p className="text-yellow-700 mt-2">
              Upgrades cost money but provide long-term benefits. Invest in them when you have steady profits!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Achievements & Goals 🏆",
      icon: "🎯",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl">
            <h4 className="font-bold text-orange-800 mb-3 flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Achievement Categories
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-lg">
                <div className="text-lg">🎯</div>
                <div className="font-bold text-sm">Trading</div>
                <p className="text-xs text-gray-600">Complete trades</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="text-lg">💰</div>
                <div className="font-bold text-sm">Wealth</div>
                <p className="text-xs text-gray-600">Grow portfolio</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="text-lg">⚡</div>
                <div className="font-bold text-sm">Upgrades</div>
                <p className="text-xs text-gray-600">Purchase power-ups</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="text-lg">💎</div>
                <div className="font-bold text-sm">Special</div>
                <p className="text-xs text-gray-600">Unique challenges</p>
              </div>
            </div>
          </div>
          <div className="bg-green-100 p-4 rounded-xl">
            <div className="font-bold text-green-800">💡 Educational Goal:</div>
            <p className="text-green-700 text-sm mt-2">
              Each achievement teaches you about different aspects of investing and market behavior. 
              Try to unlock them all to become a meme trading expert!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Investment Strategy Tips 🧠",
      icon: "💡",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-xl">
            <h4 className="font-bold text-blue-800 mb-3">📚 Key Learning Points:</h4>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg">
                <div className="font-bold text-green-700">✅ Diversification</div>
                <p className="text-xs text-gray-600">Don't put all money in one meme - spread your risk!</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-bold text-blue-700">📊 Market Research</div>
                <p className="text-xs text-gray-600">Check news and trends before making big investments</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-bold text-purple-700">⏰ Timing</div>
                <p className="text-xs text-gray-600">Buy when prices are low, sell when they're high</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-bold text-orange-700">🎯 Risk Management</div>
                <p className="text-xs text-gray-600">Never invest more than you can afford to lose</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Ready to Start Trading! 🎉",
      icon: "🚀",
      content: (
        <div className="space-y-4 text-center">
          <div className="text-6xl mb-4">🎊✨</div>
          <h3 className="text-2xl font-bold text-gray-800">You're All Set!</h3>
          <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-xl">
            <p className="text-gray-700 font-semibold mb-4">
              You now understand the basics of meme trading! Remember:
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white p-2 rounded">💰 Start small</div>
              <div className="bg-white p-2 rounded">📊 Watch trends</div>
              <div className="bg-white p-2 rounded">🎯 Diversify</div>
              <div className="bg-white p-2 rounded">📚 Keep learning</div>
            </div>
          </div>
          <div className="bg-yellow-100 p-4 rounded-xl">
            <p className="text-yellow-800 font-bold">
              💡 This is a simulation game designed to teach real investment principles in a fun way!
            </p>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const closeTutorial = () => {
    setCurrentStep(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeTutorial}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="text-2xl">{tutorialSteps[currentStep].icon}</span>
              {tutorialSteps[currentStep].title}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeTutorial}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep + 1} of {tutorialSteps.length}</span>
              <span>{Math.round(((currentStep + 1) / tutorialSteps.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Tutorial Content */}
          <Card className="border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50">
            <CardContent className="p-6">
              {tutorialSteps[currentStep].content}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex gap-2">
              {tutorialSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentStep ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {currentStep === tutorialSteps.length - 1 ? (
              <Button
                onClick={closeTutorial}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold"
              >
                Start Trading! 🚀
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Tutorial;
