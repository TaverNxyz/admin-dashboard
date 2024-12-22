import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Email } from "./types";

interface EmailTableRowProps {
  email: Email;
  onEdit: (email: Email) => void;
  onDelete: (email: Email) => void;
}

export const EmailTableRow = ({ email, onEdit, onDelete }: EmailTableRowProps) => {
  return (
    <TableRow key={email.id} className="border-gray-800 hover:bg-black/20">
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
            onClick={() => onEdit(email)}
            className="hover:bg-black/20 text-gray-400 hover:text-white"
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(email)}
            className="hover:bg-red-500/20 text-gray-400 hover:text-red-500"
          >
            Delete
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};