import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { SalesChart } from "@/components/dashboard/SalesChart";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <WelcomeCard />
        <MetricsGrid />
        <SalesChart />
      </div>
    </DashboardLayout>
  );
};

export default Index;