import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

export const SalesChart = () => {
  return (
    <Card className="bg-black/50 backdrop-blur-xl border-gray-800 hover:border-blue-500/50 transition-all duration-300">
      <div className="p-8">
        <h2 className="text-xl font-semibold text-white mb-6">Sales Overview</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="name" 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                axisLine={{ stroke: '#374151' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                axisLine={{ stroke: '#374151' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                  color: '#fff',
                  padding: '12px',
                }}
                labelStyle={{ color: '#9CA3AF' }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#0EF6FF"
                strokeWidth={2}
                dot={{ fill: '#0EF6FF', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: '#0EF6FF', stroke: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};