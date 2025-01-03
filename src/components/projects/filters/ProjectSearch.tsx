import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type ProjectSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export const ProjectSearch = ({ value, onChange }: ProjectSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
      <Input
        placeholder="Search projects..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};