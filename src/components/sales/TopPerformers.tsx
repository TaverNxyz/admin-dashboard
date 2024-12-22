import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const performers = [
  {
    name: "Sarah Johnson",
    avatar: "SJ",
    revenue: "$245,000",
    target: "$300,000",
    progress: 82
  },
  {
    name: "Michael Lee",
    avatar: "ML",
    revenue: "$198,000",
    target: "$250,000",
    progress: 79
  },
  {
    name: "Emily Davis",
    avatar: "ED",
    revenue: "$176,000",
    target: "$200,000",
    progress: 88
  }
];

export const TopPerformers = () => {
  return (
    <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border-gray-800">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Top Performers</h2>
        <div className="space-y-6">
          {performers.map((performer, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="bg-purple-900 text-white">
                    {performer.avatar}
                  </Avatar>
                  <div>
                    <p className="text-white font-medium">{performer.name}</p>
                    <p className="text-gray-400 text-sm">{performer.revenue} / {performer.target}</p>
                  </div>
                </div>
                <span className="text-purple-400 font-medium">{performer.progress}%</span>
              </div>
              <Progress value={performer.progress} className="bg-gray-700">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-900 transition-all"
                  style={{ width: `${performer.progress}%` }}
                />
              </Progress>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};