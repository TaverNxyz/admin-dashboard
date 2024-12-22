import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CustomerMetrics } from "@/components/customers/CustomerMetrics";
import { CustomerActivity } from "@/components/customers/CustomerActivity";
import { CustomerList } from "@/components/customers/CustomerList";
import { CustomerSegments } from "@/components/customers/CustomerSegments";

const Customers = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <CustomerMetrics />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CustomerList />
          </div>
          <div className="space-y-8">
            <CustomerActivity />
            <CustomerSegments />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Customers;