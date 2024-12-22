import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface InvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice?: any;
}

export const InvoiceDialog = ({ open, onOpenChange, invoice }: InvoiceDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    number: invoice?.number || "",
    customer: invoice?.customer || "",
    items: invoice?.items || [{ description: "", quantity: 1, price: 0 }],
    subtotal: invoice?.subtotal || 0,
    taxRate: invoice?.taxRate || 0,
    taxAmount: invoice?.taxAmount || 0,
    discountType: invoice?.discountType || "percentage",
    discountValue: invoice?.discountValue || 0,
    discountAmount: invoice?.discountAmount || 0,
    total: invoice?.total || 0,
    date: invoice?.date || new Date().toISOString().split('T')[0],
    dueDate: invoice?.dueDate || "",
    notes: invoice?.notes || "",
    terms: invoice?.terms || "",
    includeShipping: invoice?.includeShipping || false,
    shippingCost: invoice?.shippingCost || 0,
  });

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const taxAmount = (subtotal * formData.taxRate) / 100;
    let discountAmount = 0;

    if (formData.discountType === "percentage") {
      discountAmount = (subtotal * formData.discountValue) / 100;
    } else {
      discountAmount = formData.discountValue;
    }

    const shippingCost = formData.includeShipping ? formData.shippingCost : 0;
    const total = subtotal + taxAmount - discountAmount + shippingCost;

    setFormData(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      discountAmount,
      total
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, price: 0 }]
    }));
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData(prev => ({ ...prev, items: newItems }));
    calculateTotals();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateTotals();
    toast({
      title: invoice ? "Invoice updated" : "Invoice created",
      description: `Invoice ${formData.number} has been ${invoice ? 'updated' : 'created'}.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F2C] border-gray-800 text-white max-w-4xl">
        <DialogHeader>
          <DialogTitle>{invoice ? "Edit Invoice" : "Create New Invoice"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">Invoice Number</Label>
              <Input
                id="number"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                className="bg-black/50 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer">Customer</Label>
              <Input
                id="customer"
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                className="bg-black/50 border-gray-700 text-white"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Items</Label>
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2">
                <div className="col-span-6">
                  <Input
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    className="bg-black/50 border-gray-700 text-white"
                  />
                </div>
                <div className="col-span-3">
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                    className="bg-black/50 border-gray-700 text-white"
                  />
                </div>
                <div className="col-span-3">
                  <Input
                    type="number"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) => updateItem(index, 'price', e.target.value)}
                    className="bg-black/50 border-gray-700 text-white"
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addItem}
              className="bg-black/50 border-gray-700 text-gray-200 hover:bg-black/70"
            >
              Add Item
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                value={formData.taxRate}
                onChange={(e) => {
                  setFormData({ ...formData, taxRate: parseFloat(e.target.value) });
                  calculateTotals();
                }}
                className="bg-black/50 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>Discount</Label>
              <div className="flex gap-2">
                <Select
                  value={formData.discountType}
                  onValueChange={(value) => setFormData({ ...formData, discountType: value })}
                >
                  <SelectTrigger className="bg-black/50 border-gray-700 text-white">
                    <SelectValue placeholder="Discount Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  value={formData.discountValue}
                  onChange={(e) => {
                    setFormData({ ...formData, discountValue: parseFloat(e.target.value) });
                    calculateTotals();
                  }}
                  className="bg-black/50 border-gray-700 text-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.includeShipping}
                onCheckedChange={(checked) => setFormData({ ...formData, includeShipping: checked })}
              />
              <Label>Include Shipping Cost</Label>
            </div>
            {formData.includeShipping && (
              <Input
                type="number"
                value={formData.shippingCost}
                onChange={(e) => {
                  setFormData({ ...formData, shippingCost: parseFloat(e.target.value) });
                  calculateTotals();
                }}
                placeholder="Shipping Cost"
                className="bg-black/50 border-gray-700 text-white mt-2"
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Invoice Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bg-black/50 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="bg-black/50 border-gray-700 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="bg-black/50 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="terms">Terms and Conditions</Label>
            <Input
              id="terms"
              value={formData.terms}
              onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
              className="bg-black/50 border-gray-700 text-white"
            />
          </div>

          <div className="bg-black/30 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${formData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax Amount:</span>
              <span>${formData.taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <span>-${formData.discountAmount.toFixed(2)}</span>
            </div>
            {formData.includeShipping && (
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${formData.shippingCost.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold border-t border-gray-700 pt-2">
              <span>Total:</span>
              <span>${formData.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-black/50 border-gray-700 text-gray-200 hover:bg-black/70"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {invoice ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};