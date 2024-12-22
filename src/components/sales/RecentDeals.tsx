import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const deals = [
  {
    customer: {
      name: "Alex Thompson",
      email: "alex.t@company.com",
      avatar: "AT"
    },
    amount: "$12,450",
    status: "Closed",
    date: "2024-02-15",
    product: "Enterprise Plan"
  },
  {
    customer: {
      name: "Sarah Wilson",
      email: "sarah.w@startup.io",
      avatar: "SW"
    },
    amount: "$8,750",
    status: "In Progress",
    date: "2024-02-14",
    product: "Business Plan"
  },
  {
    customer: {
      name: "Michael Chen",
      email: "m.chen@tech.co",
      avatar: "MC"
    },
    amount: "$15,200",
    status: "Negotiation",
    date: "2024-02-13",
    product: "Custom Solution"
  },
];

export const RecentDeals = () => {
  return (
    <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border-gray-800">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Deals</h2>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-400">Customer</TableHead>
              <TableHead className="text-gray-400">Product</TableHead>
              <TableHead className="text-gray-400">Amount</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deals.map((deal, index) => (
              <TableRow key={index} className="border-gray-800">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="bg-purple-900 text-white">
                      {deal.customer.avatar}
                    </Avatar>
                    <div>
                      <p className="text-white font-medium">{deal.customer.name}</p>
                      <p className="text-gray-400 text-sm">{deal.customer.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-300">{deal.product}</TableCell>
                <TableCell className="text-gray-300 font-medium">{deal.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "border-2",
                      deal.status === "Closed" && "border-green-500 text-green-400",
                      deal.status === "In Progress" && "border-blue-500 text-blue-400",
                      deal.status === "Negotiation" && "border-yellow-500 text-yellow-400"
                    )}
                  >
                    {deal.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-300">{deal.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};