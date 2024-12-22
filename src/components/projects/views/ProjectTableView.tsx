import { Button } from "@/components/ui/button";
import { Project } from "../types/Project";

type ProjectTableViewProps = {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
};

export const ProjectTableView = ({ projects, onEdit, onDelete }: ProjectTableViewProps) => {
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
        {projects.map((project) => (
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
                  onClick={() => onEdit(project)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(project.id)}
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
};