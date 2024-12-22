import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Settings, X } from "lucide-react";
import { useState } from "react";

export const CustomizationPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [chartStyle, setChartStyle] = useState("gradient");
  const { toast } = useToast();

  const handleSavePreferences = () => {
    // In a real app, you'd save these preferences to a backend
    toast({
      title: "Preferences saved",
      description: "Your dashboard customization preferences have been updated.",
    });
  };

  return (
    <div className="fixed right-4 top-20 z-50">
      <Button
        variant="outline"
        size="icon"
        className="bg-black/50 backdrop-blur-xl border-gray-800 hover:border-blue-500/50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Settings className="h-4 w-4" />
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-12 w-80 p-4 bg-black/50 backdrop-blur-xl border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Customize Dashboard</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="compact-mode">Compact Mode</Label>
                <Switch
                  id="compact-mode"
                  checked={compactMode}
                  onCheckedChange={setCompactMode}
                />
              </div>
              <p className="text-sm text-gray-400">
                Reduce spacing between dashboard elements
              </p>
            </div>

            <div className="space-y-2">
              <Label>Chart Style</Label>
              <RadioGroup value={chartStyle} onValueChange={setChartStyle}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gradient" id="gradient" />
                  <Label htmlFor="gradient">Gradient</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="solid" id="solid" />
                  <Label htmlFor="solid">Solid</Label>
                </div>
              </RadioGroup>
            </div>

            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleSavePreferences}
            >
              Save Preferences
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};