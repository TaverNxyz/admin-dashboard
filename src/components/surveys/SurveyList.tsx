import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, Edit, Trash2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { fetchSurveys, deleteSurvey } from "./surveyService";
import { Survey } from "./types";
import { SurveyDialog } from "./SurveyDialog";

export const SurveyList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: surveys = [], isLoading } = useQuery({
    queryKey: ["surveys"],
    queryFn: fetchSurveys,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSurvey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["surveys"] });
      toast({
        title: "Survey deleted",
        description: "The survey has been successfully deleted.",
      });
    },
  });

  const filteredSurveys = surveys.filter((survey) =>
    survey.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (survey: Survey) => {
    setSelectedSurvey(survey);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this survey?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Surveys</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Survey
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search surveys..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="bg-black/50 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Responses</th>
                <th className="text-left p-4">Created</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSurveys.map((survey) => (
                <tr
                  key={survey.id}
                  className="border-b border-gray-800 hover:bg-gray-900/50"
                >
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{survey.title}</div>
                      <div className="text-sm text-gray-500">
                        {survey.description}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        survey.status === "active"
                          ? "bg-green-500/20 text-green-500"
                          : survey.status === "draft"
                          ? "bg-yellow-500/20 text-yellow-500"
                          : survey.status === "completed"
                          ? "bg-blue-500/20 text-blue-500"
                          : "bg-gray-500/20 text-gray-500"
                      }`}
                    >
                      {survey.status}
                    </span>
                  </td>
                  <td className="p-4">{survey.responses}</td>
                  <td className="p-4">
                    {new Date(survey.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(survey)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(survey.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SurveyDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        survey={selectedSurvey}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedSurvey(null);
        }}
      />
    </div>
  );
};