import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StripeWrapper from "./components/Checkout";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Stripe Payment Integration</h1>
        <Routes>
          <Route path="/" element={<StripeWrapper />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
