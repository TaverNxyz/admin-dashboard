import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { InvoiceList } from "@/components/invoicing/InvoiceList";
import { FloatingChatBubble } from "@/components/chat/FloatingChatBubble";

const Invoicing = () => {
  return (
    <DashboardLayout>
      <div className="p-4 h-[calc(100vh-4rem)]">
        <InvoiceList />
        <FloatingChatBubble />
      </div>
    </DashboardLayout>
  );
};

export default Invoicing;