import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { ChatInterface } from "@/components/chat/ChatInterface";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <WelcomeCard />
        <MetricsGrid />
        <SalesChart />
      </div>
      <ChatInterface />
    </DashboardLayout>
  );
};

export default Index;