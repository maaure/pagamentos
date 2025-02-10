import { useContext } from "react";
import {
  FeedbackContext,
  FeedbackContextType,
} from "../context/FeedbackContext";

export const useFeedback = (): FeedbackContextType => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error("useFeedback must be used within a ReloadProvider");
  }
  return context;
};
