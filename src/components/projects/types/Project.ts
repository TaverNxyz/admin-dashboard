export type Project = {
  id: string;
  name: string;
  client: string;
  status: "planned" | "in-progress" | "completed" | "delayed";
  priority: "low" | "medium" | "high";
  deadline: string;
};