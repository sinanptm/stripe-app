// src/pages/Cancel.js

import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div>
      <h1>Payment Cancelled</h1>
      <p>Your payment was not completed. You can try again later.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default Cancel;
