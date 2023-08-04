import React from "react";
import { BrowserRouter } from "react-router-dom";
import { MyRoutes } from "./containers/AppRoutes";
import { TeamsProvider } from "./context/TeamsContext";

const App = () => (
  <BrowserRouter>
    <TeamsProvider>
      <MyRoutes />
    </TeamsProvider>
  </BrowserRouter>
);

export default App;
