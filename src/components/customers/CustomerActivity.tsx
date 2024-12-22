import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Feb 10', active: 1200 },
  { date: 'Feb 11', active: 1300 },
  { date: 'Feb 12', active: 1400 },
  { date: 'Feb 13', active: 1350 },
  { date: 'Feb 14', active: 1450 },
  { date: 'Feb 15', active: 1500 },
  { date: 'Feb 16', active: 1600 },
];

export const CustomerActivity = () => {
  return (
    <Card className="bg-black/50 backdrop-blur-xl border-gray-800">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Activity Trend</h2>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
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
                }}
                labelStyle={{ color: '#9CA3AF' }}
              />
              <Line
                type="monotone"
                dataKey="active"
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