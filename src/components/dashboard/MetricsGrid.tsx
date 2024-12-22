import { Card } from "@/components/ui/card";
import { BarChart3, Users, FileText, TrendingUp } from "lucide-react";

const metrics = [
  {
    label: "Total Sales",
    value: "$24,780",
    change: "+12.5%",
    icon: BarChart3,
  },
  {
    label: "Active Leads",
    value: "184",
    change: "+8.2%",
    icon: Users,
  },
  {
    label: "Pending Invoices",
    value: "23",
    change: "-2.4%",
    icon: FileText,
  },
  {
    label: "Revenue Growth",
    value: "32.8%",
    change: "+4.3%",
    icon: TrendingUp,
  },
];

export const MetricsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card
          key={metric.label}
          className="bg-black/50 backdrop-blur-xl border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-cyan-glow hover:shadow-lg hover:shadow-cyan-glow"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <metric.icon className="h-6 w-6 text-[#0EF6FF]" />
              <span className={`text-sm ${metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {metric.change}
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-gray-400 text-sm">{metric.label}</h3>
              <p className="text-2xl font-bold text-white">{metric.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};