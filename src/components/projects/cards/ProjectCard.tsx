import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar, Clock, User } from "lucide-react";

type ProjectCardProps = {
  project: {
    id: string;
    name: string;
    client: string;
    status: "planned" | "in-progress" | "completed" | "delayed";
    priority: "low" | "medium" | "high";
    deadline: string;
  };
  variant?: "default" | "compact" | "detailed";
  onClick?: () => void;
};

export const ProjectCard = ({ project, variant = "default", onClick }: ProjectCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "planned":
        return "bg-blue-500/10 text-blue-400 border-blue-500";
      case "in-progress":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500";
      case "completed":
        return "bg-green-500/10 text-green-400 border-green-500";
      case "delayed":
        return "bg-red-500/10 text-red-400 border-red-500";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-400 border-red-500";
      case "medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500";
      case "low":
        return "bg-blue-500/10 text-blue-400 border-blue-500";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500";
    }
  };

  if (variant === "compact") {
    return (
      <Card
        className="p-4 cursor-pointer bg-black/50 backdrop-blur-xl border-gray-800 hover:border-blue-500/50 transition-all duration-300"
        onClick={onClick}
      >
        <h4 className="font-medium text-white mb-2">{project.name}</h4>
        <div className="flex justify-between items-center">
          <span className={cn("px-2.5 py-1 rounded-full text-xs border", getStatusColor(project.status))}>
            {project.status}
          </span>
          <span className="text-xs text-gray-400">{project.deadline}</span>
        </div>
      </Card>
    );
  }

  if (variant === "detailed") {
    return (
      <Card
        className="p-6 cursor-pointer bg-black/50 backdrop-blur-xl border-gray-800 hover:border-blue-500/50 transition-all duration-300"
        onClick={onClick}
      >
        <div className="flex justify-between items-start mb-4">
          <h4 className="font-medium text-white text-lg">{project.name}</h4>
          <span className={cn("px-2.5 py-1 rounded-full text-xs border", getPriorityColor(project.priority))}>
            {project.priority}
          </span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-gray-400">
            <User className="h-4 w-4 mr-2" />
            <span className="text-sm">{project.client}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <Clock className="h-4 w-4 mr-2" />
            <span className={cn("px-2.5 py-1 rounded-full text-xs border", getStatusColor(project.status))}>
              {project.status}
            </span>
          </div>
          <div className="flex items-center text-gray-400">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{project.deadline}</span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="p-4 cursor-pointer bg-black/50 backdrop-blur-xl border-gray-800 hover:border-blue-500/50 transition-all duration-300"
      onClick={onClick}
    >
      <h4 className="font-medium text-white mb-2">{project.name}</h4>
      <p className="text-sm text-gray-400 mb-2">{project.client}</p>
      <div className="flex justify-between items-center">
        <span className={cn("px-2.5 py-1 rounded-full text-xs border", getPriorityColor(project.priority))}>
          {project.priority}
        </span>
        <span className="text-xs text-gray-400">{project.deadline}</span>
      </div>
    </Card>
  );
};