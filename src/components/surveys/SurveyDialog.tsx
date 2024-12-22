import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Survey, Question } from "./types";
import { createSurvey, updateSurvey } from "./surveyService";

interface SurveyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  survey: Survey | null;
  onClose: () => void;
}

export const SurveyDialog = ({
  open,
  onOpenChange,
  survey,
  onClose,
}: SurveyDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Survey["status"]>("draft");
  const [questions, setQuestions] = useState<Question[]>([]);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (survey) {
      setTitle(survey.title);
      setDescription(survey.description);
      setStatus(survey.status);
      setQuestions(survey.questions);
    } else {
      setTitle("");
      setDescription("");
      setStatus("draft");
      setQuestions([]);
    }
  }, [survey]);

  const createMutation = useMutation({
    mutationFn: createSurvey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["surveys"] });
      toast({
        title: "Survey created",
        description: "The survey has been successfully created.",
      });
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Survey> }) =>
      updateSurvey(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["surveys"] });
      toast({
        title: "Survey updated",
        description: "The survey has been successfully updated.",
      });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const surveyData = {
      title,
      description,
      status,
      questions,
    };

    if (survey) {
      updateMutation.mutate({ id: survey.id, data: surveyData });
    } else {
      createMutation.mutate(surveyData);
    }
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Math.random().toString(36).substr(2, 9),
      type: "text",
      text: "",
      required: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index: number, updates: Partial<Question>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], ...updates };
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {survey ? "Edit Survey" : "Create New Survey"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter survey title"
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter survey description"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Status</label>
              <Select value={status} onValueChange={(value: Survey["status"]) => setStatus(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Questions</label>
                <Button type="button" onClick={addQuestion} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Add Question
                </Button>
              </div>

              {questions.map((question, index) => (
                <div key={question.id} className="space-y-3 p-4 border border-gray-800 rounded-lg">
                  <div className="flex justify-between">
                    <Input
                      value={question.text}
                      onChange={(e) =>
                        updateQuestion(index, { text: e.target.value })
                      }
                      placeholder="Question text"
                      className="flex-1 mr-2"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Select
                      value={question.type}
                      onValueChange={(value: Question["type"]) =>
                        updateQuestion(index, { type: value })
                      }
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Question type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`required-${question.id}`}
                        checked={question.required}
                        onCheckedChange={(checked) =>
                          updateQuestion(index, { required: checked as boolean })
                        }
                      />
                      <label
                        htmlFor={`required-${question.id}`}
                        className="text-sm text-gray-500"
                      >
                        Required
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {survey ? "Update Survey" : "Create Survey"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};