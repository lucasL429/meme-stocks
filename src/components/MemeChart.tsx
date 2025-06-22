
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
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
      timeLabel = `${timeAgo}m`;
    } else {
      const hours = Math.floor(timeAgo / 60);
      timeLabel = `${hours}h`;
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
    <div className="w-full h-48">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={chartData} 
            margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="time"
              axisLine={true}
              tickLine={true}
              tick={{ fontSize: 10, fill: '#6b7280' }}
              interval="preserveStartEnd"
              height={20}
              label={{ value: 'Time', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fontSize: '10px' } }}
            />
            <YAxis 
              axisLine={true}
              tickLine={true}
              tick={{ fontSize: 10, fill: '#6b7280' }}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              domain={['dataMin - dataMin * 0.02', 'dataMax + dataMax * 0.02']}
              width={40}
              label={{ value: 'Price ($)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: '10px' } }}
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
              strokeWidth={2}
              dot={false}
              activeDot={{ 
                r: 3, 
                fill: lineColor,
                strokeWidth: 1,
                stroke: '#fff'
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default MemeChart;
