import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Download, FileEdit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { InvoiceDialog } from "./InvoiceDialog";
import { InvoiceTemplateDialog } from "./InvoiceTemplateDialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Invoice {
  id: string;
  number: string;
  customer: string;
  amount: number;
  status: "draft" | "sent" | "paid";
  date: string;
}

const mockInvoices: Invoice[] = [
  {
    id: "1",
    number: "INV-001",
    customer: "Acme Corp",
    amount: 1500.00,
    status: "paid",
    date: "2024-03-20",
  },
  {
    id: "2",
    number: "INV-002",
    customer: "TechStart Inc",
    amount: 2300.00,
    status: "sent",
    date: "2024-03-22",
  },
];

export const InvoiceList = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const { toast } = useToast();

  const handleDelete = (invoice: Invoice) => {
    setInvoices(invoices.filter((inv) => inv.id !== invoice.id));
    toast({
      title: "Invoice deleted",
      description: `Invoice ${invoice.number} has been deleted.`,
    });
  };

  const handleDownload = (invoice: Invoice) => {
    toast({
      title: "Downloading PDF",
      description: `Preparing PDF for invoice ${invoice.number}...`,
    });
    // PDF generation logic would go here
  };

  return (
    <Card className="bg-gradient-to-r from-[#1A1F2C] to-[#2A2F3C] border-gray-800 hover:border-blue-500/50 transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Invoices</h2>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsTemplateOpen(true)}
              variant="outline"
              className="bg-black/50 border-gray-700 text-gray-200 hover:bg-black/70"
            >
              <FileEdit className="w-4 h-4 mr-2" />
              Templates
            </Button>
            <Button
              onClick={() => setIsCreateOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Invoice
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-gray-800 hover:bg-black/20">
              <TableHead className="text-gray-400">Invoice Number</TableHead>
              <TableHead className="text-gray-400">Customer</TableHead>
              <TableHead className="text-gray-400">Amount</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Date</TableHead>
              <TableHead className="text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id} className="border-gray-800 hover:bg-black/20">
                <TableCell className="text-white">{invoice.number}</TableCell>
                <TableCell className="text-gray-300">{invoice.customer}</TableCell>
                <TableCell className="text-gray-300">${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    invoice.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                    invoice.status === 'sent' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="text-gray-300">{invoice.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDownload(invoice)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedInvoice(invoice)}
                      className="text-gray-400 hover:text-white"
                    >
                      <FileEdit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(invoice)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <InvoiceDialog
        open={isCreateOpen || !!selectedInvoice}
        onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) setSelectedInvoice(null);
        }}
        invoice={selectedInvoice}
      />

      <InvoiceTemplateDialog
        open={isTemplateOpen}
        onOpenChange={setIsTemplateOpen}
      />
    </Card>
  );
};