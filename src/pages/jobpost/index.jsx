import { Helmet } from "react-helmet";
import JobApplicationFormSection from "./JobApplicationFormSection";
import React from "react";
import Home from "pages/Nav";


export default function MacBookPro16NinePage() {
  return (
    <>
     <Home/>
      <Helmet>
        <title>Job Creation Form</title>
        <meta
          name="description"
          content="Create job listings with our easy-to-use form. Enter job titles, descriptions, and set experience levels to attract the right candidates."
        />
      </Helmet>
      <div className="flex w-full bg-white-a700 px-[26px] py-[34px] sm:p-4">
        <div className="mx-auto mb-10 flex w-full max-w-[1674px] flex-col gap-[108px] lg:gap-[108px] md:gap-[81px] sm:gap-[54px]">
              <div className="flex flex-col items-start gap-3">
                {/* job application form section */}
            <JobApplicationFormSection />
          </div>
        </div>
      </div>
    </>
  );
}
