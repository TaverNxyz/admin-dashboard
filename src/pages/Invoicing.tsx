import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { InvoiceList } from "@/components/invoicing/InvoiceList";
import { FloatingChatBubble } from "@/components/chat/FloatingChatBubble";

const Invoicing = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <InvoiceList />
        <FloatingChatBubble />
      </div>
    </DashboardLayout>
  );
};

export default Invoicing;