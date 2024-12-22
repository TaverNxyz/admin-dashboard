import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface CustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  customer?: {
    name: string;
    email: string;
    status: string;
    satisfaction: string;
    notes?: string;
    lastPurchase?: string;
    totalSpent?: string;
  };
}

export const CustomerDialog = ({ 
  open, 
  onOpenChange, 
  mode, 
  customer 
}: CustomerDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(
    customer || {
      name: "",
      email: "",
      status: "Active",
      satisfaction: "Satisfied",
      notes: "",
      lastPurchase: new Date().toISOString().split('T')[0],
      totalSpent: "0",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: `Customer ${mode === "add" ? "added" : "updated"} successfully`,
      description: `${formData.name} has been ${mode === "add" ? "added to" : "updated in"} your customer list.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Customer" : "Edit Customer"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="satisfaction">Satisfaction Level</Label>
              <Select
                value={formData.satisfaction}
                onValueChange={(value) =>
                  setFormData({ ...formData, satisfaction: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select satisfaction level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Very Satisfied">Very Satisfied</SelectItem>
                  <SelectItem value="Satisfied">Satisfied</SelectItem>
                  <SelectItem value="Neutral">Neutral</SelectItem>
                  <SelectItem value="Dissatisfied">Dissatisfied</SelectItem>
                  <SelectItem value="Very Dissatisfied">Very Dissatisfied</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastPurchase">Last Purchase Date</Label>
              <Input
                id="lastPurchase"
                type="date"
                value={formData.lastPurchase}
                onChange={(e) =>
                  setFormData({ ...formData, lastPurchase: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalSpent">Total Spent ($)</Label>
              <Input
                id="totalSpent"
                type="number"
                min="0"
                step="0.01"
                value={formData.totalSpent}
                onChange={(e) =>
                  setFormData({ ...formData, totalSpent: `$${e.target.value}` })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Add any relevant notes about the customer..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {mode === "add" ? "Add Customer" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};