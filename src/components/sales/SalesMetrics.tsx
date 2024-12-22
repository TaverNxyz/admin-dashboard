import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart } from "lucide-react";

const metrics = [
  {
    title: "Total Revenue",
    value: "$124,563.00",
    change: "+12.5%",
    isPositive: true,
    icon: DollarSign,
  },
  {
    title: "New Customers",
    value: "1,245",
    change: "+18.2%",
    isPositive: true,
    icon: Users,
  },
  {
    title: "Average Deal Size",
    value: "$12,450",
    change: "-3.1%",
    isPositive: false,
    icon: ShoppingCart,
  },
];

export const SalesMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border-gray-800 hover:border-purple-500/50 transition-all duration-300">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">{metric.title}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{metric.value}</h3>
              </div>
              <metric.icon className="h-6 w-6 text-purple-400" />
            </div>
            <div className="flex items-center mt-4">
              {metric.isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
              )}
              <span className={`text-sm ${metric.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {metric.change}
              </span>
              <span className="text-gray-400 text-sm ml-1">vs last month</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};