import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AppContext } from "./Contexts/AppContext.jsx";
import ScrollToTop from "./router/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <MantineProvider> */}
    <BrowserRouter>
      <ScrollToTop />
      <AppContext>
        <App />
      </AppContext>
    </BrowserRouter>
    {/* </MantineProvider> */}
  </StrictMode>,
);
