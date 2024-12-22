import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { InvoiceList } from "@/components/invoicing/InvoiceList";

const Invoicing = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <InvoiceList />
      </div>
    </DashboardLayout>
  );
};

export default Invoicing;