import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectDialog } from "./ProjectDialog";
import { ProjectSearch } from "./filters/ProjectSearch";
import { ProjectCard } from "./cards/ProjectCard";
import { Project } from "./types/Project";

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

export const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.client.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

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

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter((p) => p.id !== projectId));
    setSelectedProject(null);
  };

  return (
    <Card className="bg-black/50 backdrop-blur-xl border-gray-800 p-6">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 w-full md:w-auto">
            <ProjectSearch value={search} onChange={setSearch} />
          </div>
          <Button
            onClick={() => {
              setSelectedProject(null);
              setIsDialogOpen(true);
            }}
            className="w-full md:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="space-y-6">
              <ProjectCard
                project={project}
                variant="default"
                onClick={() => {
                  setSelectedProject(project);
                  setIsDialogOpen(true);
                }}
              />
              <ProjectCard
                project={project}
                variant="compact"
                onClick={() => {
                  setSelectedProject(project);
                  setIsDialogOpen(true);
                }}
              />
              <ProjectCard
                project={project}
                variant="detailed"
                onClick={() => {
                  setSelectedProject(project);
                  setIsDialogOpen(true);
                }}
              />
            </div>
          ))}
        </div>
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