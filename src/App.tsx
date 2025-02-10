import React from "react";
import { Pagamentos } from "./pages/Pagamentos";
import { FeedbackProvider } from "./components/context/FeedbackProvider";

const App: React.FC = () => {
  return (
    <FeedbackProvider>
      <Pagamentos />
    </FeedbackProvider>
  );
};

export default App;
