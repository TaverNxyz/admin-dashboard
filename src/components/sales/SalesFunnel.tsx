import { Card } from "@/components/ui/card";
import { FunnelChart, Funnel, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Leads', value: 1200, fill: '#8B5CF6' },
  { name: 'Qualified', value: 800, fill: '#7C3AED' },
  { name: 'Proposals', value: 400, fill: '#6D28D9' },
  { name: 'Negotiations', value: 200, fill: '#5B21B6' },
  { name: 'Closed', value: 100, fill: '#4C1D95' },
];

export const SalesFunnel = () => {
  return (
    <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border-gray-800">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Sales Funnel</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                  color: '#fff',
                }}
              />
              <Funnel
                data={data}
                dataKey="value"
                nameKey="name"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};