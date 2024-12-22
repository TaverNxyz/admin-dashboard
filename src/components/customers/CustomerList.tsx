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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface Customer {
  name: string;
  email: string;
  avatar: string;
  status: string;
  lastPurchase: string;
  totalSpent: string;
  satisfaction: string;
  notes?: string;
}

const PAGE_SIZE = 10;

const fetchCustomers = async ({ pageParam = 0 }) => {
  // Simulating API call with mock data
  const mockCustomers: Customer[] = Array.from({ length: PAGE_SIZE }, (_, i) => ({
    name: `Customer ${pageParam * PAGE_SIZE + i + 1}`,
    email: `customer${pageParam * PAGE_SIZE + i + 1}@example.com`,
    avatar: `C${i + 1}`,
    status: Math.random() > 0.5 ? "Active" : "Inactive",
    lastPurchase: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
    totalSpent: `$${Math.floor(Math.random() * 20000)}`,
    satisfaction: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"][Math.floor(Math.random() * 5)],
    notes: Math.random() > 0.5 ? "Some customer notes here." : undefined,
  }));

  return {
    customers: mockCustomers,
    nextPage: pageParam + 1,
    hasMore: pageParam < 4, // Limit to 5 pages for demo
  };
};

export const CustomerList = () => {
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const { toast } = useToast();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
  });

  const loadMoreRef = useInfiniteScroll(fetchNextPage, hasNextPage);

  const customers = data?.pages.flatMap(page => page.customers) || [];

  const handleDelete = (customer: Customer) => {
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

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading customers...</div>;
  }

  return (
    <Card className="bg-gradient-to-r from-[#1A1F2C] to-[#2A2F3C] border-gray-800 hover:border-blue-500/50 transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Customer List</h2>
          <CustomerActions viewMode={viewMode} setViewMode={setViewMode} />
        </div>

        <ScrollArea className="h-[600px]">
          {viewMode === "list" ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800 hover:bg-black/20">
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
                    <TableRow key={index} className="border-gray-800 hover:bg-black/20">
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
              <div ref={loadMoreRef} className="h-10" />
            </>
          ) : (
            <CustomerKanban customers={customers} />
          )}
        </ScrollArea>
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
