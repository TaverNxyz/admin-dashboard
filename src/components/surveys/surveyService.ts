import { Survey, Question } from "./types";

// Mock data
const mockSurveys: Survey[] = [
  {
    id: "1",
    title: "Customer Satisfaction Survey",
    description: "Help us improve our services",
    status: "active",
    questions: [
      {
        id: "q1",
        type: "rating",
        text: "How satisfied are you with our service?",
        required: true
      },
      {
        id: "q2",
        type: "text",
        text: "What could we improve?",
        required: false
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    responses: 45
  }
];

export const fetchSurveys = async (): Promise<Survey[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockSurveys;
};

export const createSurvey = async (survey: Omit<Survey, "id" | "createdAt" | "updatedAt" | "responses">): Promise<Survey> => {
  const newSurvey: Survey = {
    ...survey,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    responses: 0
  };
  mockSurveys.push(newSurvey);
  return newSurvey;
};

export const updateSurvey = async (id: string, survey: Partial<Survey>): Promise<Survey> => {
  const index = mockSurveys.findIndex(s => s.id === id);
  if (index === -1) throw new Error("Survey not found");
  
  mockSurveys[index] = {
    ...mockSurveys[index],
    ...survey,
    updatedAt: new Date().toISOString()
  };
  
  return mockSurveys[index];
};

export const deleteSurvey = async (id: string): Promise<void> => {
  const index = mockSurveys.findIndex(s => s.id === id);
  if (index === -1) throw new Error("Survey not found");
  mockSurveys.splice(index, 1);
};