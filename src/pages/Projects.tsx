import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProjectMetrics } from "@/components/projects/ProjectMetrics";
import { ProjectList } from "@/components/projects/ProjectList";
import { FloatingChatBubble } from "@/components/chat/FloatingChatBubble";
import { ProjectKanban } from "@/components/projects/ProjectKanban";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Projects = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <ProjectMetrics />
        <Tabs defaultValue="list" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="list" className="mt-6">
            <ProjectList />
          </TabsContent>
          <TabsContent value="kanban" className="mt-6">
            <ProjectKanban />
          </TabsContent>
        </Tabs>
        <FloatingChatBubble />
      </div>
    </DashboardLayout>
  );
};

export default Projects;