import { Helmet } from "react-helmet";
import { Button, Heading, Input, Img } from "../../components";
import React, { useState } from "react";
import axios from "axios"; // Import axios for making API calls
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection after registration
import Home from "pages/Nav";
import { BASE_URL } from '../../api/api';

export default function Signup() {
  // State management for form inputs
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [employeeSize, setEmployeeSize] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const newCompany = {
      companyName,
      email,
      password,
      contactNumber,
      employeeSize,
    };

    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, newCompany);
      alert(response.data.message); // Alert the message from the response
      navigate("/verify"); // Redirect to the login page after successful registration
    } catch (error) {
      console.error("Error during registration:", error);
      alert(error.response?.data?.message || "Registration failed"); // Alert error message
    }
  };

  return (
    <>
      <Home />
      <Helmet>
        <title>Sign Up - Join Our Community Now</title>
        <meta
          name="description"
          content="Get in touch and sign up today to become a part of our industry-leading community. Accept our terms and proceed with confidence."
        />
      </Helmet>
      <div className="flex flex-col items-center w-full bg-white-a700 py-5 lg:py-10">
        <div className="container-xs flex flex-col items-center justify-center w-full px-4 lg:px-5">
          {/* Signup Section */}
          <div className="mb-1 flex justify-center self-stretch">
            <div className="flex flex-col items-center w-full rounded-[14px] bg-white-a700 p-[26px] md:p-4">
              <Heading size="headingmd" as="h2" className="text-[32px] font-semibold text-black-900">
                Sign Up
              </Heading>
              <Heading as="h3" className="mt-2 text-[16px] font-medium text-gray-900_b2 lg:text-[13px]">
                Lorem Ipsum is simply dummy text
              </Heading>
              <form onSubmit={handleSubmit} className="flex flex-col w-full mt-4"> {/* Form element */}
                <Input
                  shape="round"
                  type="text"
                  placeholder="Company Name"
                  onChange={(e) => setCompanyName(e.target.value)}
                  prefix={<Img src="images/img_lock.svg" alt="Lock" className="my-2 h-[18px] w-[16px]" />}
                  className="mt-[20px] h-[40px] border border-gray-300 rounded-md px-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out" // Smaller input size
                />
                <Input
                  shape="round"
                  type="text"
                  placeholder="Contact Number"
                  onChange={(e) => setContactNumber(e.target.value)}
                  prefix={<Img src="images/img_call.svg" alt="Call" className="my-2 h-[18px] w-[18px]" />}
                  className="mt-[20px] h-[40px] border border-gray-300 rounded-md px-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out" // Smaller input size
                />
                <Input
                  shape="round"
                  type="email"
                  placeholder="Company Email"
                  onChange={(e) => setEmail(e.target.value)}
                  prefix={<Img src="images/img_lock_blue_gray_700.svg" alt="Lock" className="my-2 h-[18px] w-[20px]" />}
                  className="mt-[20px] h-[40px] border border-gray-300 rounded-md px-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out" // Smaller input size
                />
                <Input
                  shape="round"
                  type="number"
                  placeholder="Employee Size"
                  onChange={(e) => setEmployeeSize(e.target.value)}
                  prefix={<Img src="images/img_contrast.svg" alt="Contrast" className="my-2 h-[18px] w-[32px]" />}
                  className="mt-[20px] h-[40px] border border-gray-300 rounded-md px-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out" // Smaller input size
                />
                <Input
                  shape="round"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  prefix={<Img src="images/img_lock.svg" alt="Lock" className="my-2 h-[18px] w-[16px]" />}
                  className="mt-[20px] h-[40px] border border-gray-300 rounded-md px-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out" // Smaller input size
                />
                <Heading
                  size="headingxs"
                  as="h4"
                  className="mt-[30px] w-[64%] text-center text-[16px] font-bold leading-5 text-gray-900_b2 lg:w-full lg:text-[13px] md:w-full"
                >
                  <span className="text-gray-900_b2">By clicking on proceed you will accept our&nbsp;</span>
                  <span className="text-blue-a700_b2">Terms</span>
                  <span className="text-gray-900_b2">&nbsp;&&nbsp;</span>
                  <span className="text-blue-a700_b2">Conditions</span>
                </Heading>
                <Button 
                  type="submit" 
                  shape="round" 
                  className="mt-4 self-stretch rounded-md px-[10px] py-[8px] font-bold text-[14px] bg-blue-600 text-white hover:bg-blue-700" // Smaller button size
                >
                  Proceed
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
