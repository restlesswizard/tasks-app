import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ModalProvider } from "./providers/ModalProvider/ModalProvider.jsx";
import { TaskProvider } from "./providers/TaskProdiver/TaskProdiver.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TaskProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </TaskProvider>
  </StrictMode>
);
