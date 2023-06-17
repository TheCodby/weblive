import React from "react";
import SignupCard from "./signup-card";
import PageWraper from "../components/page-wrapper";

const page = () => {
  return (
    <PageWraper className="flex flex-col md:flex-row gap-4 justify-center items-center absolute w-full h-full">
      <SignupCard />
    </PageWraper>
  );
};

export default page;
