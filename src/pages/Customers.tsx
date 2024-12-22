import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CustomerMetrics } from "@/components/customers/CustomerMetrics";
import { CustomerList } from "@/components/customers/CustomerList";
import { ChatInterface } from "@/components/chat/ChatInterface";

const Customers = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <CustomerMetrics />
        <div className="space-y-8">
          <CustomerList />
          <ChatInterface />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Customers;