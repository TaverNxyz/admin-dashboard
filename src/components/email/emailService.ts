import { Email, EmailsResponse } from "./types";

export const mockFetchEmails = async ({ pageParam = 0 }): Promise<EmailsResponse> => {
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