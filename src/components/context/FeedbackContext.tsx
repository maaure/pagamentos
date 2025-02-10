// FeedbackContext.tsx
import { createContext } from "react";

export type FeedbackType = "success" | "warning" | "info" | "error";

export interface FeedbackContextType {
  pushFeedback: (type: FeedbackType) => void;
  feedbacks: string[];
}

export const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined,
);
