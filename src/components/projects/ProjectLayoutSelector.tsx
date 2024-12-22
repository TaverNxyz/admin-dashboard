import { Button } from "@/components/ui/button";
import { LayoutGrid, List, Columns } from "lucide-react";

type LayoutOption = "grid" | "list" | "columns";

type ProjectLayoutSelectorProps = {
  currentLayout: LayoutOption;
  onLayoutChange: (layout: LayoutOption) => void;
};

export const ProjectLayoutSelector = ({
  currentLayout,
  onLayoutChange,
}: ProjectLayoutSelectorProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant={currentLayout === "grid" ? "default" : "outline"}
        size="sm"
        onClick={() => onLayoutChange("grid")}
      >
        <LayoutGrid className="h-4 w-4 mr-2" />
        Grid
      </Button>
      <Button
        variant={currentLayout === "list" ? "default" : "outline"}
        size="sm"
        onClick={() => onLayoutChange("list")}
      >
        <List className="h-4 w-4 mr-2" />
        List
      </Button>
      <Button
        variant={currentLayout === "columns" ? "default" : "outline"}
        size="sm"
        onClick={() => onLayoutChange("columns")}
      >
        <Columns className="h-4 w-4 mr-2" />
        Columns
      </Button>
    </div>
  );
};