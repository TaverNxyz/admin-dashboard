import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import { ProjectDialog } from "./ProjectDialog";
import { ProjectCard } from "./cards/ProjectCard";

type LayoutOption = "grid" | "list" | "columns";

type ProjectListProps = {
  layout: LayoutOption;
};

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

export const ProjectList = ({ layout }: ProjectListProps) => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.client.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
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

  const renderProjects = () => {
    if (layout === "list") {
      return (
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-800">
              <th className="pb-3 text-gray-400">Project Name</th>
              <th className="pb-3 text-gray-400">Client</th>
              <th className="pb-3 text-gray-400">Status</th>
              <th className="pb-3 text-gray-400">Priority</th>
              <th className="pb-3 text-gray-400">Deadline</th>
              <th className="pb-3 text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredProjects.map((project) => (
              <tr key={project.id} className="hover:bg-white/5">
                <td className="py-4 text-white">{project.name}</td>
                <td className="py-4 text-gray-300">{project.client}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    {
                      'planned': 'bg-blue-500/10 text-blue-400',
                      'in-progress': 'bg-yellow-500/10 text-yellow-400',
                      'completed': 'bg-green-500/10 text-green-400',
                      'delayed': 'bg-red-500/10 text-red-400',
                    }[project.status]
                  }`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    {
                      'low': 'bg-gray-500/10 text-gray-400',
                      'medium': 'bg-yellow-500/10 text-yellow-400',
                      'high': 'bg-red-500/10 text-red-400',
                    }[project.priority]
                  }`}>
                    {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                  </span>
                </td>
                <td className="py-4 text-gray-300">{project.deadline}</td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedProject(project);
                        setIsDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return (
      <div className={`grid gap-6 ${
        layout === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      }`}>
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            variant={layout === "grid" ? "detailed" : "default"}
            onClick={() => {
              setSelectedProject(project);
              setIsDialogOpen(true);
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="bg-black/50 backdrop-blur-xl border-gray-800 p-6">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
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
        </div>

        <div className="overflow-auto max-h-[600px]">
          {renderProjects()}
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