import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SalesOverview } from "@/components/sales/SalesOverview";
import { SalesMetrics } from "@/components/sales/SalesMetrics";
import { RecentDeals } from "@/components/sales/RecentDeals";
import { SalesFunnel } from "@/components/sales/SalesFunnel";
import { TopPerformers } from "@/components/sales/TopPerformers";

const Sales = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SalesOverview />
          <SalesMetrics />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RecentDeals />
          </div>
          <div className="space-y-8">
            <SalesFunnel />
            <TopPerformers />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sales;