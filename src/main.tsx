import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Pagamentos } from "./pages/Pagamentos.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Pagamentos />
  </StrictMode>,
);
