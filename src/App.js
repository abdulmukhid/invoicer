import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CallToAction, ScrollToTop } from "./pages";
import Invoice from "./components/App";
import AuthContext from "./context/auth";
import { Header, Footer, Error } from "./pages";
import ThankYou from "./pages/ThankYou";
import Cancelled from "./pages/Cancelled";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <React.Fragment>
              {true ? (
                <Invoice />
              ) : (
                <React.Fragment>
                  <Footer />
                </React.Fragment>
              )}
            </React.Fragment>
          }
        ></Route>
        <Route path="/thank-you" element={<ThankYou />}></Route>
        <Route path="/cancelled" element={<Cancelled />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
