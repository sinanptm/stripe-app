// src/pages/Success.js

import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Thank you for your purchase! Your transaction was successful.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default Success;
