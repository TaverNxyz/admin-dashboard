import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { MoreHorizontal, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { CustomerDialog } from "./CustomerDialog";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Customer } from "./CustomerList";

export const CustomerKanban = ({ customers }: { customers: Customer[] }) => {
  const { toast } = useToast();
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);

  const handleDelete = (customer: Customer) => {
    toast({
      title: "Customer deleted",
      description: `${customer.name} has been removed from your customer list.`,
    });
  };

  const statuses = ["Active", "Inactive"];

  return (
    <div className="grid grid-cols-2 gap-6">
      {statuses.map((status) => (
        <div key={status} className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              {status}
              <Badge variant="outline" className="ml-2">
                {customers.filter((c) => c.status === status).length}
              </Badge>
            </h3>
          </div>
          <ScrollArea className="h-[500px]">
            <div className="space-y-4 pr-4">
              {customers
                .filter((customer) => customer.status === status)
                .map((customer, index) => (
                  <Card
                    key={index}
                    className="p-4 bg-black/50 backdrop-blur-xl border-gray-800 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="bg-purple-900 text-white">
                          {customer.avatar}
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">{customer.name}</p>
                          <p className="text-sm text-gray-400">{customer.email}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal className="h-5 w-5 text-gray-400" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setEditCustomer(customer)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(customer)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    {customer.notes && (
                      <div className="mt-4 flex items-start gap-2 text-sm text-gray-400">
                        <MessageSquare className="h-4 w-4 mt-0.5" />
                        <p>{customer.notes}</p>
                      </div>
                    )}
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <Badge
                        variant="outline"
                        className={cn(
                          "border-2",
                          customer.satisfaction === "Very Satisfied"
                            ? "border-green-500 text-green-400"
                            : "border-blue-500 text-blue-400"
                        )}
                      >
                        {customer.satisfaction}
                      </Badge>
                      <span className="text-gray-400">
                        Total Spent: {customer.totalSpent}
                      </span>
                    </div>
                  </Card>
                ))}
            </div>
          </ScrollArea>
        </div>
      ))}
      {editCustomer && (
        <CustomerDialog
          open={!!editCustomer}
          onOpenChange={() => setEditCustomer(null)}
          mode="edit"
          customer={editCustomer}
        />
      )}
    </div>
  );
};