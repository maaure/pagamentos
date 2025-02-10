import { useEffect, useState } from "react";
import { useFeedback } from "../hooks/useFeedback";

export const FeedbackBar = () => {
  const { feedbacks } = useFeedback();
  const [show, setShow] = useState(true);

  const colors = {
    success: {
      bg: "bg-emerald-700",
      shadow: "shadow-emerald-500/50",
    },
    warning: {
      bg: "bg-yellow-500",
      shadow: "shadow-yellow-500/50",
    },
    info: {
      bg: "bg-blue-500",
      shadow: "shadow-blue-500/50",
    },
    error: {
      bg: "bg-red-700",
      shadow: "shadow-red-500/50",
    },
  }[feedbacks[feedbacks.length - 1]];

  useEffect(() => {
    if (feedbacks.length === 0) return;

    setShow(true);

    const hideTimeout = setTimeout(() => {
      setShow(false);
    }, 10);

    return () => {
      clearTimeout(hideTimeout);
    };
  }, [feedbacks]);

  return (
    <div
      onClick={() => setShow(false)}
      className={`h-1 ${colors?.bg} ${colors?.shadow} shadow-md relative transition-all shadow-emerald-500 ease-out ${show ? "duration-0" : "duration-5000"} ${show ? "w-[100%] opacity-100" : "w-[0%] opacity-0"}`}
    />
  );
};
