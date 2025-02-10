import { useState, ReactNode } from "react";
import { FeedbackContext, FeedbackType } from "./FeedbackContext";

export const FeedbackProvider = ({ children }: { children: ReactNode }) => {
  const [feedbacks, setFeedbacks] = useState<string[]>([]);

  const pushFeedback = (type: FeedbackType) => {
    setFeedbacks((prev) => [...prev, type]);
  };

  return (
    <FeedbackContext.Provider value={{ pushFeedback, feedbacks }}>
      {children}
    </FeedbackContext.Provider>
  );
};
