import React from "react";
import { useRoutes } from "react-router-dom";
import User from "pages/User";
import NotFound from "pages/NotFound";
import Signup from "pages/signup";
import Verify from "pages/verify";
import Signin from "pages/signin";
import Intrview from "pages/interview";
import Jobpost from "pages/jobpost";
import Contact from 'pages/contact'
import Home from "pages/Home";
import SendJobAlerts from "pages/jobpost/jobalert";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/user", element: <User /> },
    { path: "*", element: <NotFound /> },
    {
      path: "signup",
      element: <Signup />,
    },
    {
      path: "verify",
      element: <Verify />,
    },
    {
      path: "signin",
      element: <Signin />,
    },
    {
      path: "interview",
      element: <Intrview />,
    },
    {
      path: "jobpost",
      element: <Jobpost />,
    },
    {
      path: "jobalert",
      element: <SendJobAlerts />,
    },
    {
      path: "contact",
      element: <Contact />,
    },
  ]);

  return element;
};

export default ProjectRoutes;
