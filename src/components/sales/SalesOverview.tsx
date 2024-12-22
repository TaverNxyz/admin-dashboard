import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const data = [
  { month: 'Jan', revenue: 4000, target: 3000 },
  { month: 'Feb', revenue: 3000, target: 3200 },
  { month: 'Mar', revenue: 5000, target: 3400 },
  { month: 'Apr', revenue: 2780, target: 3600 },
  { month: 'May', revenue: 1890, target: 3800 },
  { month: 'Jun', revenue: 2390, target: 4000 },
  { month: 'Jul', revenue: 3490, target: 4200 },
];

export const SalesOverview = () => {
  return (
    <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-xl border-gray-800 hover:border-blue-500/50 transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Sales Overview</h2>
          <Select defaultValue="year">
            <SelectTrigger className="w-32 bg-black/20 border-gray-700 text-white">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="month" 
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
                dataKey="revenue"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={{ fill: '#8B5CF6', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: '#8B5CF6', stroke: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#F97316"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#F97316', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: '#F97316', stroke: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};