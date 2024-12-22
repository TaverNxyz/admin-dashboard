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
        <div className="grid grid-cols-1 gap-8">
          <SalesChart />
          <ChatInterface />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;