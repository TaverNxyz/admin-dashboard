import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit } from "lucide-react";
import { ProjectDialog } from "./ProjectDialog";
import { ProjectSearch } from "./filters/ProjectSearch";
import { ProjectCard } from "./cards/ProjectCard";
import { Project } from "./types/Project";
import { useToast } from "@/hooks/use-toast";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const PAGE_SIZE = 10;

const fetchProjects = async ({ pageParam = 0 }) => {
  // Simulating API call with mock data
  const mockProjects = Array.from({ length: PAGE_SIZE }, (_, i) => ({
    id: `${pageParam * PAGE_SIZE + i + 1}`,
    name: `Project ${pageParam * PAGE_SIZE + i + 1}`,
    client: `Client ${pageParam * PAGE_SIZE + i + 1}`,
    status: ["planned", "in-progress", "completed", "delayed"][Math.floor(Math.random() * 4)] as Project["status"],
    priority: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as Project["priority"],
    deadline: new Date(Date.now() + Math.random() * 10000000000).toISOString().split('T')[0],
  }));

  return {
    projects: mockProjects,
    nextPage: pageParam + 1,
    hasMore: pageParam < 4, // Limit to 5 pages for demo
  };
};

export const ProjectList = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
  });

  const loadMoreRef = useInfiniteScroll(fetchNextPage, hasNextPage);

  const filteredProjects = data?.pages.flatMap(page => 
    page.projects.filter(project => 
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.client.toLowerCase().includes(search.toLowerCase())
    )
  ) || [];

  const handleCreateProject = (newProject: Omit<Project, "id">) => {
    const project = {
      ...newProject,
      id: Math.random().toString(36).substr(2, 9),
    };
    setProjects([...projects, project]);
    toast({
      title: "Success",
      description: "Project created successfully",
    });
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(projects.map((p) => 
      p.id === updatedProject.id ? updatedProject : p
    ));
    toast({
      title: "Success",
      description: "Project updated successfully",
    });
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter((p) => p.id !== projectId));
    toast({
      title: "Success",
      description: "Project deleted successfully",
    });
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading projects...</div>;
  }

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

        <div className="grid grid-cols-1 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="relative group w-full min-h-[200px]">
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setSelectedProject(project);
                    setIsDialogOpen(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
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
          <div ref={loadMoreRef} className="h-10" />
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
