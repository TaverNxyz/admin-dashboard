import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { CustomerActions } from "./CustomerActions";
import { CustomerKanban } from "./CustomerKanban";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, MessageSquare } from "lucide-react";
import { CustomerDialog } from "./CustomerDialog";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const customers = [
  {
    name: "Alex Thompson",
    email: "alex.t@company.com",
    avatar: "AT",
    status: "Active",
    lastPurchase: "2024-02-15",
    totalSpent: "$12,450",
    satisfaction: "Very Satisfied",
    notes: "Key decision maker for enterprise accounts. Prefers email communication."
  },
  {
    name: "Sarah Wilson",
    email: "sarah.w@startup.io",
    avatar: "SW",
    status: "Active",
    lastPurchase: "2024-02-14",
    totalSpent: "$8,750",
    satisfaction: "Satisfied",
    notes: "Interested in upgrading to premium plan. Follow up in March."
  },
  {
    name: "Michael Chen",
    email: "m.chen@tech.co",
    avatar: "MC",
    status: "Inactive",
    lastPurchase: "2024-01-13",
    totalSpent: "$15,200",
    satisfaction: "Neutral",
    notes: "Currently evaluating competitor products. Schedule check-in call."
  },
  {
    name: "Emma Davis",
    email: "emma.d@design.co",
    avatar: "ED",
    status: "Active",
    lastPurchase: "2024-02-16",
    totalSpent: "$9,300",
    satisfaction: "Very Satisfied",
    notes: "Recently expanded team size. Potential for account growth."
  },
];

export const CustomerList = () => {
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
  const [editCustomer, setEditCustomer] = useState<typeof customers[0] | null>(null);
  const { toast } = useToast();

  const handleDelete = (customer: typeof customers[0]) => {
    toast({
      title: "Customer deleted",
      description: `${customer.name} has been removed from your customer list.`,
    });
  };

  const getSatisfactionColor = (satisfaction: string) => {
    switch (satisfaction) {
      case "Very Satisfied":
        return "border-green-500 text-green-400";
      case "Satisfied":
        return "border-blue-500 text-blue-400";
      case "Neutral":
        return "border-yellow-500 text-yellow-400";
      case "Dissatisfied":
        return "border-orange-500 text-orange-400";
      case "Very Dissatisfied":
        return "border-red-500 text-red-400";
      default:
        return "border-gray-500 text-gray-400";
    }
  };

  return (
    <Card className="bg-black/50 backdrop-blur-xl border-gray-800">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Customer List</h2>
          <CustomerActions viewMode={viewMode} setViewMode={setViewMode} />
        </div>

        {viewMode === "list" ? (
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400">Customer</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Last Purchase</TableHead>
                <TableHead className="text-gray-400">Total Spent</TableHead>
                <TableHead className="text-gray-400">Satisfaction</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer, index) => (
                <TableRow key={index} className="border-gray-800">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="bg-purple-900 text-white">
                        {customer.avatar}
                      </Avatar>
                      <div>
                        <p className="text-white font-medium">{customer.name}</p>
                        <p className="text-gray-400 text-sm">{customer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "border-2",
                        customer.status === "Active" ? "border-green-500 text-green-400" : "border-red-500 text-red-400"
                      )}
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{customer.lastPurchase}</TableCell>
                  <TableCell className="text-gray-300 font-medium">{customer.totalSpent}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "border-2",
                        getSatisfactionColor(customer.satisfaction)
                      )}
                    >
                      {customer.satisfaction}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MessageSquare className="h-4 w-4 text-gray-400" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Customer Notes</DialogTitle>
                            <DialogDescription>
                              {customer.notes || "No notes available for this customer."}
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditCustomer(customer)}
                      >
                        <Pencil className="h-4 w-4 text-gray-400" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(customer)}
                      >
                        <Trash2 className="h-4 w-4 text-gray-400" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <CustomerKanban customers={customers} />
        )}
      </div>
      {editCustomer && (
        <CustomerDialog
          open={!!editCustomer}
          onOpenChange={() => setEditCustomer(null)}
          mode="edit"
          customer={editCustomer}
        />
      )}
    </Card>
  );
};