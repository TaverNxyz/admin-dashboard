import { Button } from "@/components/ui/button";
import { Plus, KanbanSquare, List } from "lucide-react";
import { useState } from "react";
import { CustomerDialog } from "./CustomerDialog";

interface CustomerActionsProps {
  viewMode: "list" | "kanban";
  setViewMode: (mode: "list" | "kanban") => void;
}

export const CustomerActions = ({ viewMode, setViewMode }: CustomerActionsProps) => {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("list")}
        >
          <List className="w-4 h-4 mr-2" />
          List
        </Button>
        <Button
          variant={viewMode === "kanban" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("kanban")}
        >
          <KanbanSquare className="w-4 h-4 mr-2" />
          Kanban
        </Button>
      </div>
      <Button onClick={() => setShowAddDialog(true)}>
        <Plus className="w-4 h-4 mr-2" />
        Add Customer
      </Button>
      <CustomerDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
        mode="add"
      />
    </div>
  );
};