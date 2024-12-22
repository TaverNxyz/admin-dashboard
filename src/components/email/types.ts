export interface Email {
  id: string;
  subject: string;
  recipient: string;
  status: string;
  sentAt: string;
  template?: string;
}

export interface EmailsResponse {
  emails: Email[];
  nextPage: number;
  hasMore: boolean;
}