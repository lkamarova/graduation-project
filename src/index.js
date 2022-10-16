import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import AboutStore from "./components/AboutStore";
import Contacts from "./components/Contacts";
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutStore />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
