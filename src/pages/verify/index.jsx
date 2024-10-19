import { Helmet } from "react-helmet";
import AuthenticationSection from "./AuthenticationSection";
import React from "react";
import Home from "pages/Nav";

export default function verify() {
  return (
    <>
    <Home/>
      <Helmet>
        <title>OTP Verification - Secure Your Account</title>
        <meta
          name="description"
          content="Ensure the security of your account with our OTP verification process. Verify your email and mobile number quickly and easily."
        />
      </Helmet>
     
        {/* authentication section */}
        <AuthenticationSection />
      
    </>
  );
}
