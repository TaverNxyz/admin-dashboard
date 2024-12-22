import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const customers = [
  {
    name: "Alex Thompson",
    email: "alex.t@company.com",
    avatar: "AT",
    status: "Active",
    lastPurchase: "2024-02-15",
    totalSpent: "$12,450",
    segment: "Premium"
  },
  {
    name: "Sarah Wilson",
    email: "sarah.w@startup.io",
    avatar: "SW",
    status: "Active",
    lastPurchase: "2024-02-14",
    totalSpent: "$8,750",
    segment: "Regular"
  },
  {
    name: "Michael Chen",
    email: "m.chen@tech.co",
    avatar: "MC",
    status: "Inactive",
    lastPurchase: "2024-01-13",
    totalSpent: "$15,200",
    segment: "Premium"
  },
  {
    name: "Emma Davis",
    email: "emma.d@design.co",
    avatar: "ED",
    status: "Active",
    lastPurchase: "2024-02-16",
    totalSpent: "$9,300",
    segment: "Regular"
  },
];

export const CustomerList = () => {
  return (
    <Card className="bg-black/50 backdrop-blur-xl border-gray-800">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Customer List</h2>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-400">Customer</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Last Purchase</TableHead>
              <TableHead className="text-gray-400">Total Spent</TableHead>
              <TableHead className="text-gray-400">Segment</TableHead>
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
                      customer.segment === "Premium" ? "border-purple-500 text-purple-400" : "border-blue-500 text-blue-400"
                    )}
                  >
                    {customer.segment}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};