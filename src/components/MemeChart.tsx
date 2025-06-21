
import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Meme } from '@/pages/Index';

interface MemeChartProps {
  meme: Meme;
}

const MemeChart = ({ meme }: MemeChartProps) => {
  const chartData = meme.priceHistory.map((price, index) => ({
    time: index,
    price: price,
  }));

  const isPositive = meme.change24h >= 0;

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis hide />
          <YAxis hide />
          <Tooltip
            formatter={(value: number) => [`$${value.toFixed(4)}`, 'Price']}
            labelFormatter={() => ''}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={isPositive ? '#10b981' : '#ef4444'}
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 4, fill: isPositive ? '#10b981' : '#ef4444' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MemeChart;
