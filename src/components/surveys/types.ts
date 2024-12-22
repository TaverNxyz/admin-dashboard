export type SurveyStatus = "draft" | "active" | "completed" | "archived";

export interface Question {
  id: string;
  type: "multiple_choice" | "text" | "rating";
  text: string;
  options?: string[];
  required: boolean;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  status: SurveyStatus;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
  responses: number;
}