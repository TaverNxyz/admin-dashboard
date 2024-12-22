import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { EmailList } from "@/components/email/EmailList";
import { FloatingChatBubble } from "@/components/chat/FloatingChatBubble";

const Emails = () => {
  return (
    <DashboardLayout>
      <div className="p-4 h-[calc(100vh-4rem)]">
        <EmailList />
        <FloatingChatBubble />
      </div>
    </DashboardLayout>
  );
};

export default Emails;