import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Heading, Text } from "../../components"; // Removed Img for icons since it's not used
import { BASE_URL } from '../../api/api';
import Home from "pages/Nav";

export default function LoginCompany() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
      setSuccess(response.data.message); // Display success message

      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to homepage after login
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Home />
      <Helmet>
        <title>Login - Company Portal</title>
        <meta
          name="description"
          content="Sign in to your company account. Please enter your email and password to access the portal."
        />
      </Helmet>
      <div className="flex flex-col items-center bg-white-a700 py-10">
        <div className="container mx-auto flex flex-col gap-10 px-5 md:px-2">
          <div className="flex flex-col items-center">
            <Heading
              size="textmd"
              as="h1"
              className="text-center text-2xl font-medium text-gray-900"
            >
              Welcome to the Company Portal! Please sign in to continue.
            </Heading>
            <div className="flex flex-col items-center w-full max-w-md bg-white p-6 rounded-lg shadow-md">
              <Heading size="headingmd" as="h2" className="text-2xl font-semibold text-black-900">
                Login
              </Heading>
              <Heading as="h3" className="mt-2 text-lg font-medium text-gray-900">
                Enter your email and password
              </Heading>

              {/* Form for login */}
              <form onSubmit={handleLogin} className="mt-4 w-full">
                {/* Email input */}
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-1 text-base font-normal text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Password input */}
                <div className="mb-4">
                  <label htmlFor="password" className="block mb-1 text-base font-normal text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Error and Success messages */}
                {error && (
                  <div className="mb-4 text-red-600 text-sm">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="mb-4 text-green-600 text-sm">
                    {success}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
                >
                  Login
                </button>
              </form>

              {/* Sign Up Link */}
              <Text className="mt-4 text-xs text-gray-600 text-center sm:text-sm md:text-base">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 underline">Sign up here</Link>
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
