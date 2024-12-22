import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Plus, Download, Trash2 } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
}

const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Standard Invoice",
    description: "Basic invoice template with company logo and payment details",
  },
  {
    id: "2",
    name: "Detailed Invoice",
    description: "Comprehensive invoice template with itemized listing and terms",
  },
];

export const InvoiceTemplateDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [isCreating, setIsCreating] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
  });

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    const template = {
      id: (templates.length + 1).toString(),
      ...newTemplate,
    };
    setTemplates([...templates, template]);
    setIsCreating(false);
    setNewTemplate({ name: "", description: "" });
    toast({
      title: "Template created",
      description: `Template "${template.name}" has been created.`,
    });
  };

  const handleDeleteTemplate = (template: Template) => {
    setTemplates(templates.filter((t) => t.id !== template.id));
    toast({
      title: "Template deleted",
      description: `Template "${template.name}" has been deleted.`,
    });
  };

  const handleDownloadTemplate = (template: Template) => {
    toast({
      title: "Downloading template",
      description: `Preparing download for "${template.name}"...`,
    });
    // Template download logic would go here
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F2C] border-gray-800 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>Invoice Templates</DialogTitle>
        </DialogHeader>
        
        {!isCreating ? (
          <div className="space-y-4">
            <Button
              onClick={() => setIsCreating(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
            
            <div className="space-y-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="p-4 bg-black/50 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-white">{template.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">{template.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownloadTemplate(template)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteTemplate(template)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleCreateTemplate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Template Name</Label>
              <Input
                id="name"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                className="bg-black/50 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newTemplate.description}
                onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                className="bg-black/50 border-gray-700 text-white"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreating(false)}
                className="bg-black/50 border-gray-700 text-gray-200 hover:bg-black/70"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Create Template
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};