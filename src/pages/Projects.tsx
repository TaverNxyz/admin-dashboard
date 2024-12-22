import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProjectMetrics } from "@/components/projects/ProjectMetrics";
import { ProjectList } from "@/components/projects/ProjectList";
import { ChatInterface } from "@/components/chat/ChatInterface";

const Projects = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <ProjectMetrics />
        <ProjectList />
        <ChatInterface />
      </div>
    </DashboardLayout>
  );
};

export default Projects;