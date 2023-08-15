import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CallToAction, ScrollToTop } from "./pages";
import Invoice from "./components/App";
import AuthContext from "./context/auth";
import { Header, Footer, Error } from "./pages";
import ThankYou from "./pages/ThankYou";
import Cancelled from "./pages/Cancelled";
import AllRecords from "./components/AllRecords";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Invoice />
      
    </BrowserRouter>
  );
}
