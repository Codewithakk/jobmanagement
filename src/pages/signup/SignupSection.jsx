import { Button, Heading, Input, Img } from "../../components";
import React, { useState } from "react";
import axios from "axios"; // Import axios for making API calls
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection after registration
import { BASE_URL } from '../../api/api';

export default function SignupSection() {
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

    console.log("Submitting:", newCompany); // Log the values being submitted

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
      {/* signup section */}
      <div className="mb-1 flex justify-center self-stretch">
        <div className="container-xs flex items-center justify-between gap-5 px-[26px] lg:px-5 md:flex-col md:px-5">
          <Heading
            size="textmd"
            as="h1"
            className="mb-[250px] ml-[42px] w-[42%] self-end text-[22.24px] font-medium leading-7 text-gray-900_b2 lg:ml-0 lg:w-[42%] lg:text-[18px] md:ml-0 md:w-full md:self-auto"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
          </Heading>
          <div className="signupcolumn_border flex w-[42%] flex-col items-center rounded-[14px] bg-white-a700 p-[26px] md:w-full sm:p-4">
            <a href="#" className="mt-2 lg:text-[27px] md:text-[26px] sm:text-[24px]">
              <Heading size="headingmd" as="h2" className="text-[32px] font-semibold text-black-900">
                Sign Up
              </Heading>
            </a>
            <Heading as="h3" className="mt-2 text-[16px] font-medium text-gray-900_b2 lg:text-[13px]">
              Lorem Ipsum is simply dummy text
            </Heading>
            <form onSubmit={handleSubmit} className="flex flex-col w-full">
              <Input
                shape="round"
                type="text"
                name="Company Name Input"
                placeholder="Company Name"
                onChange={(e) => setCompanyName(e.target.value)}
                prefix={<Img src="images/img_lock.svg" alt="Lock" className="my-2 h-[18px] w-[16px]" />}
                className="mt-[20px] gap-4 self-stretch rounded-md border border-blue_gray-100 px-4 py-2"
              />
              <Input
                shape="round"
                type="text"
                name="contactNumber Input"
                placeholder="Contact Number"
                onChange={(e) => setContactNumber(e.target.value)}
                prefix={
                  <div className="flex h-[18px] w-[18px] items-center justify-center">
                    <Img src="images/img_call.svg" alt="Call" className="my-2 h-[18px] w-[18px]" />
                  </div>
                }
                className="mt-[20px] gap-4 self-stretch rounded-md border border-blue_gray-100 px-4 py-2"
              />
              <Input
                shape="round"
                type="email"
                name="Company Email Input"
                placeholder="Company Email"
                onChange={(e) => setEmail(e.target.value)}
                prefix={<Img src="images/img_lock_blue_gray_700.svg" alt="Lock" className="my-2 h-[18px] w-[20px]" />}
                className="mt-[20px] gap-4 self-stretch rounded-md border border-blue_gray-100 px-4 py-2"
              />
              <Input
                shape="round"
                type="number"
                name="Employee Size Input"
                placeholder="Employee Size"
                onChange={(e) => setEmployeeSize(e.target.value)}
                prefix={<Img src="images/img_contrast.svg" alt="Contrast" className="my-2 h-[18px] w-[32px]" />}
                className="mt-[20px] gap-4 self-stretch rounded-md border border-blue_gray-100 px-4 py-2"
              />
              <Input
                shape="round"
                type="password"
                name="Password Input"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                prefix={<Img src="images/img_lock.svg" alt="Lock" className="my-2 h-[18px] w-[16px]" />}
                className="mt-[20px] gap-4 self-stretch rounded-md border border-blue_gray-100 px-4 py-2"
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
                className="mt-4 self-stretch rounded-md px-[34px] py-2 font-bold sm:px-4"
              >
                Proceed
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
