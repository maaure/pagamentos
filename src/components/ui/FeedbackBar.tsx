import { useEffect, useState } from "react";
import { useFeedback } from "../hooks/useFeedback";

export const FeedbackBar = () => {
  const { feedbacks } = useFeedback();
  const [show, setShow] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

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

    console.log(feedbacks);
    setShouldRender(true);
    setShow(true);

    const hideTimeout = setTimeout(() => {
      setShow(false);
    }, 50);

    const unmountTimeout = setTimeout(() => {
      setShouldRender(false);
    }, 1200);

    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(unmountTimeout);
    };
  }, [feedbacks]);

  if (!shouldRender) return null;

  return (
    <div
      onClick={() => setShow(false)}
      className={`h-1 ${colors?.bg} ${colors?.shadow} shadow relative transition-all ease-out duration-1200 ${
        show ? "w-[100%]" : "w-[0%]"
      }`}
    />
  );
};
