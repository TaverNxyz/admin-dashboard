import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SurveyList } from "@/components/surveys/SurveyList";
import { FloatingChatBubble } from "@/components/chat/FloatingChatBubble";

const Surveys = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <SurveyList />
        <FloatingChatBubble />
      </div>
    </DashboardLayout>
  );
};

export default Surveys;