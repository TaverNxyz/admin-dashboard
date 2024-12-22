import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EmailDialog } from "./EmailDialog";
import { useToast } from "@/components/ui/use-toast";

interface Email {
  id: string;
  subject: string;
  recipient: string;
  status: string;
  sentAt: string;
  template?: string;
}

const mockFetchEmails = async ({ pageParam = 0 }) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const emails: Email[] = Array.from({ length: 10 }, (_, i) => ({
    id: `${pageParam}-${i}`,
    subject: `Email Subject ${pageParam * 10 + i + 1}`,
    recipient: `recipient${i + 1}@example.com`,
    status: ["Sent", "Draft", "Scheduled"][Math.floor(Math.random() * 3)],
    sentAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    template: Math.random() > 0.5 ? "Template A" : "Template B",
  }));

  return {
    emails,
    nextPage: pageParam + 1,
    hasMore: pageParam < 5,
  };
};

export const EmailList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const { toast } = useToast();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["emails", searchQuery],
    queryFn: mockFetchEmails,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
  });

  const loadMoreRef = useInfiniteScroll(fetchNextPage, hasNextPage);

  const handleEdit = (email: Email) => {
    setSelectedEmail(email);
    setDialogOpen(true);
  };

  const handleDelete = (email: Email) => {
    toast({
      title: "Email deleted",
      description: `Email "${email.subject}" has been deleted.`,
    });
  };

  return (
    <Card className="bg-gradient-to-r from-[#1A1F2C] to-[#2A2F3C] border-gray-800 hover:border-blue-500/50 transition-all duration-300 h-full">
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Emails</h2>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="Search emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-black/20 border-gray-800 text-white placeholder:text-gray-500"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="border-gray-800 hover:bg-black/20"
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => {
                setSelectedEmail(null);
                setDialogOpen(true);
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Email
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-black/20">
                <TableHead className="text-gray-400">Subject</TableHead>
                <TableHead className="text-gray-400">Recipient</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Sent At</TableHead>
                <TableHead className="text-gray-400">Template</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.pages.map((page) =>
                page.emails.map((email) => (
                  <TableRow
                    key={email.id}
                    className="border-gray-800 hover:bg-black/20"
                  >
                    <TableCell className="text-white">{email.subject}</TableCell>
                    <TableCell className="text-white">{email.recipient}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          email.status === "Sent"
                            ? "bg-green-500/20 text-green-500"
                            : email.status === "Draft"
                            ? "bg-gray-500/20 text-gray-500"
                            : "bg-blue-500/20 text-blue-500"
                        }`}
                      >
                        {email.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-white">
                      {new Date(email.sentAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-white">{email.template}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(email)}
                          className="hover:bg-black/20 text-gray-400 hover:text-white"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(email)}
                          className="hover:bg-red-500/20 text-gray-400 hover:text-red-500"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {isLoading ? (
            <div className="flex justify-center p-4">
              <div className="text-gray-500">Loading...</div>
            </div>
          ) : (
            <div ref={loadMoreRef} className="p-4 text-center">
              {isFetchingNextPage ? (
                <div className="text-gray-500">Loading more...</div>
              ) : hasNextPage ? (
                <Button
                  variant="ghost"
                  onClick={() => fetchNextPage()}
                  className="text-gray-500 hover:text-white"
                >
                  Load More
                </Button>
              ) : (
                <div className="text-gray-500">No more emails to load</div>
              )}
            </div>
          )}
        </ScrollArea>
      </div>
      <EmailDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        email={selectedEmail}
        mode={selectedEmail ? "edit" : "create"}
      />
    </Card>
  );
};