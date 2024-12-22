import { Card } from "@/components/ui/card";

export const WelcomeCard = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-gray-800">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          Welcome to AlgoTech Builds CRM
        </h1>
        <p className="text-gray-400">
          Manage your sales, invoices, and customer relationships with our AI-powered dashboard
        </p>
      </div>
    </Card>
  );
};