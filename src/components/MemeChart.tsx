
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Meme } from '@/pages/Index';

interface MemeChartProps {
  meme: Meme;
}

const MemeChart = ({ meme }: MemeChartProps) => {
  // Create time-based chart data with proper labels
  const chartData = meme.priceHistory.map((price, index) => {
    const timeAgo = meme.priceHistory.length - 1 - index;
    let timeLabel = '';
    
    if (timeAgo === 0) {
      timeLabel = 'Now';
    } else if (timeAgo < 60) {
      timeLabel = `${timeAgo}m ago`;
    } else {
      const hours = Math.floor(timeAgo / 60);
      timeLabel = `${hours}h ago`;
    }
    
    return {
      time: timeLabel,
      timeIndex: index,
      price: price,
      priceFormatted: `$${price.toFixed(4)}`
    };
  });

  const isPositive = meme.change24h >= 0;
  const lineColor = isPositive ? '#10b981' : '#ef4444';

  const chartConfig = {
    price: {
      label: 'Price',
      color: lineColor,
    },
  };

  return (
    <div className="w-full h-full min-h-[200px]">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 30 }}>
          <XAxis 
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#6b7280' }}
            interval="preserveStartEnd"
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#6b7280' }}
            tickFormatter={(value) => `$${value.toFixed(3)}`}
            domain={['dataMin - dataMin * 0.02', 'dataMax + dataMax * 0.02']}
          />
          <ChartTooltip 
            content={<ChartTooltipContent />}
            formatter={(value: number) => [`$${value.toFixed(4)}`, 'Price']}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={lineColor}
            strokeWidth={3}
            dot={false}
            activeDot={{ 
              r: 5, 
              fill: lineColor,
              strokeWidth: 2,
              stroke: '#fff'
            }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default MemeChart;
