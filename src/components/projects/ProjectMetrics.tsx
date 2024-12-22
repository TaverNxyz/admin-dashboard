import { Card } from "@/components/ui/card";
import { Briefcase, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

const metrics = [
  {
    label: "Total Projects",
    value: "24",
    change: "+3",
    icon: Briefcase,
  },
  {
    label: "In Progress",
    value: "12",
    change: "+2",
    icon: Clock,
  },
  {
    label: "Completed",
    value: "8",
    change: "+1",
    icon: CheckCircle2,
  },
  {
    label: "Delayed",
    value: "4",
    change: "-1",
    icon: AlertTriangle,
  },
];

export const ProjectMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card
          key={metric.label}
          className="bg-black/50 backdrop-blur-xl border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <metric.icon className="h-6 w-6 text-[#0EF6FF]" />
              </div>
              <span className={`text-sm font-medium px-2.5 py-1 rounded-full ${
                metric.change.startsWith('+') 
                  ? 'bg-green-500/10 text-green-400' 
                  : 'bg-red-500/10 text-red-400'
              }`}>
                {metric.change}
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-gray-400 text-sm font-medium">{metric.label}</h3>
              <p className="text-2xl font-bold text-white">{metric.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};