import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Invoice from "./components/App";
import StateContext from "./context/stateContext";

export default function App() {

  return (
    <BrowserRouter>
      <Invoice />
      <StateContext />
    </BrowserRouter>
  );
}
