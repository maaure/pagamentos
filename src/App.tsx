import React from "react";
import { FeedbackProvider } from "./components/context/FeedbackProvider";
import { Pagamentos } from "./pages/Pagamentos";

const App: React.FC = () => {
  return (
    <FeedbackProvider>
      <Pagamentos></Pagamentos>
    </FeedbackProvider>
  );
};

export default App;
