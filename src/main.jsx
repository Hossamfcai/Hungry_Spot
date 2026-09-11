import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AppContext } from "./Contexts/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <AppContext>
          <App />
        </AppContext>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
);
