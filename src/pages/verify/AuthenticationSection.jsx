import { Button, Input, Heading } from "../../components"; 
import React, { useState } from "react";
import { BASE_URL } from '../../api/api';
import { AiOutlineCheckCircle } from 'react-icons/ai'; // Import the tick icon

export default function AuthenticationSection() {
  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [mobileMessage, setMobileMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleContactNumberChange = (e) => setContactNumber(e.target.value);
  const handleEmailOtpChange = (e) => setEmailOtp(e.target.value);
  const handleMobileOtpChange = (e) => setMobileOtp(e.target.value);

  const handleEmailVerification = async () => {
    if (!email || emailOtp.length !== 6) {
      setEmailMessage("Please enter a valid email and a 6-digit OTP.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, otp: emailOtp })
      });

      const data = await response.json();

      if (response.ok) {
        setIsEmailVerified(true);
        setEmailMessage("Email verified successfully!");
      } else {
        setEmailMessage(data.message);
      }
    } catch (error) {
      console.error("Error verifying email OTP:", error);
      setEmailMessage("An error occurred while verifying the email OTP.");
    }
  };

  const handleMobileVerification = async () => {
    if (!contactNumber || contactNumber.length < 10 || !/^\d+$/.test(contactNumber)) {
      setMobileMessage("Please enter a valid mobile number.");
      return;
    }
  
    // Check if the entered OTP is '123456' (default OTP)
    if (mobileOtp == "123456") {
      setIsMobileVerified(true);
      setMobileMessage("Mobile verified successfully using default OTP!");
      return;
    }
  
    // Proceed with actual verification via API if it's not the default OTP
    try {
      const response = await fetch(`${BASE_URL}/auth/verify-phone`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactNumber, otp: mobileOtp }),
      });
      
      const data = await response.json();
  
      if (response.ok) {
        setIsMobileVerified(true);
        setMobileMessage("Mobile verified successfully!");
      } else {
        setMobileMessage(data.message);
      }
    } catch (error) {
      console.error("Error verifying mobile OTP:", error);
      setMobileMessage("An error occurred while verifying the mobile OTP.");
    }
  };
  

  const styles = {
    input: {
      width: "400px", // Fixed width for a professional look
      padding: "10px 15px", // Increased padding for comfort
      borderRadius: "5px", // Subtle rounded corners
      border: "1px solid #d1d5db", // Light gray border
      outline: "none", // Remove default outline
      transition: "border-color 0.3s", // Smooth border color transition
      fontSize: "16px", // Readable font size
    },
    inputFocus: {
      borderColor: "#4f46e5", // Change border color on focus
      boxShadow: "0 0 5px rgba(79, 70, 229, 0.5)", // Add shadow on focus
    },
  };

  return (
    <div className="flex justify-center py-8 px-4 sm:px-0">
      <div className="container flex flex-col lg:flex-row justify-between gap-10 lg:gap-5 w-full max-w-screen-lg">
        <div className="signupcolumn_border w-full flex flex-col items-center gap-6 p-6 rounded-lg bg-white shadow-md">
          <div className="text-center mb-6">
            <Heading as="h3" className="text-base font-medium text-gray-600 mt-1">
              Verify both
            </Heading>
          </div>

          {/* Email Input and OTP */}
          <Input
            shape="round"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
          />
          <Input
            shape="round"
            type="text"
            name="emailOtp"
            placeholder="Email OTP"
            value={emailOtp}
            onChange={handleEmailOtpChange}
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
          />
          <Button
            shape="round"
            className="w-full mt-4 rounded-md px-6 py-2 bg-blue-600 text-white font-bold flex items-center justify-center"
            onClick={handleEmailVerification}
          >
            Verify Email
            {isEmailVerified && <AiOutlineCheckCircle className="ml-2 text-black-500" size={16} />}
          </Button>
          {emailMessage && <p className="mt-2 text-red-600">{emailMessage}</p>}

          {/* Mobile Number and OTP */}
          <Input
            shape="round"
            type="text"
            name="contactNumber"
            placeholder="Mobile Number"
            value={contactNumber}
            onChange={handleContactNumberChange}
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
          />
          <Input
            shape="round"
            type="text"
            name="mobileOtp"
            placeholder="Mobile OTP"
            value={mobileOtp}
            onChange={handleMobileOtpChange}
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
          />
          <Button
            shape="round"
            className="w-full mt-4 rounded-md px-6 py-2 bg-blue-600 text-white font-bold flex items-center justify-center"
            onClick={handleMobileVerification}
          >
            Verify Mobile OTP
            {isMobileVerified && <AiOutlineCheckCircle className="ml-2 text-black-500" size={16} />}
          </Button>
          <h4>If did not get otp then please enter 123456 </h4>
          {mobileMessage && <p className="mt-2 text-red-600">{mobileMessage}</p>}
        </div>
      </div>
    </div>
  );
}
