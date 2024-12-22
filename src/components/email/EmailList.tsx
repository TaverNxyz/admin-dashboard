import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EmailDialog } from "./EmailDialog";
import { useToast } from "@/components/ui/use-toast";
import { mockFetchEmails } from "./emailService";
import { EmailTableRow } from "./EmailTableRow";
import { Email } from "./types";

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
    initialPageParam: 0,
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
                  <EmailTableRow
                    key={email.id}
                    email={email}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
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