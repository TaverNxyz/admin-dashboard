import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectDialog } from "./ProjectDialog";
import { cn } from "@/lib/utils";

type Project = {
  id: string;
  name: string;
  client: string;
  status: "planned" | "in-progress" | "completed" | "delayed";
  priority: "low" | "medium" | "high";
  deadline: string;
};

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    client: "TechCorp",
    status: "in-progress",
    priority: "high",
    deadline: "2024-04-15",
  },
  {
    id: "2",
    name: "Mobile App Development",
    client: "StartupX",
    status: "planned",
    priority: "medium",
    deadline: "2024-05-01",
  },
];

const columns = [
  { id: "planned", title: "Planned" },
  { id: "in-progress", title: "In Progress" },
  { id: "completed", title: "Completed" },
  { id: "delayed", title: "Delayed" },
];

export const ProjectKanban = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleCreateProject = (newProject: Omit<Project, "id">) => {
    const project = {
      ...newProject,
      id: Math.random().toString(36).substr(2, 9),
    };
    setProjects([...projects, project]);
    setIsDialogOpen(false);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(projects.map((p) => 
      p.id === updatedProject.id ? updatedProject : p
    ));
    setSelectedProject(null);
  };

  return (
    <Card className="bg-black/50 backdrop-blur-xl border-gray-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Project Board</h2>
        <Button
          onClick={() => {
            setSelectedProject(null);
            setIsDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <div
            key={column.id}
            className="bg-gray-900/50 rounded-lg p-4 min-h-[400px]"
          >
            <h3 className="text-sm font-medium text-gray-400 mb-4">
              {column.title}
            </h3>
            <div className="space-y-4">
              {projects
                .filter((project) => project.status === column.id)
                .map((project) => (
                  <Card
                    key={project.id}
                    className={cn(
                      "p-4 cursor-pointer hover:border-blue-500/50 transition-all",
                      "bg-gray-800/50 border-gray-700"
                    )}
                    onClick={() => {
                      setSelectedProject(project);
                      setIsDialogOpen(true);
                    }}
                  >
                    <h4 className="font-medium text-white mb-2">
                      {project.name}
                    </h4>
                    <p className="text-sm text-gray-400 mb-2">
                      {project.client}
                    </p>
                    <div className="flex justify-between items-center">
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs",
                          {
                            "bg-yellow-500/10 text-yellow-400":
                              project.priority === "medium",
                            "bg-red-500/10 text-red-400":
                              project.priority === "high",
                            "bg-gray-500/10 text-gray-400":
                              project.priority === "low",
                          }
                        )}
                      >
                        {project.priority}
                      </span>
                      <span className="text-xs text-gray-400">
                        {project.deadline}
                      </span>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>

      <ProjectDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        project={selectedProject}
        onSubmit={selectedProject ? handleUpdateProject : handleCreateProject}
      />
    </Card>
  );
};