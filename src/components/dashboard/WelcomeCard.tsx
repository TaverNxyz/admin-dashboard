import { Card } from "@/components/ui/card";

export const WelcomeCard = () => {
  return (
    <Card className="bg-gradient-to-r from-[#1A1F2C] to-[#2A2F3C] border-gray-800 hover:border-blue-500/50 transition-all duration-300">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
          Welcome to AlgoTech Builds CRM
        </h1>
        <p className="text-gray-300 text-lg">
          Manage your sales, invoices, and customer relationships with our AI-powered dashboard
        </p>
      </div>
    </Card>
  );
};