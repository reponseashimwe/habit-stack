import { SignUp } from "@clerk/nextjs";
import React from "react";

function SignUpPage() {
  const defaultColor = "#E30B5C";
  const gradientColor = `linear-gradient(to bottom, ${defaultColor}, #ff0440)`;
  return (
    <div
      style={{ background: gradientColor }}
      className="flex justify-center items-center flex-col gap-10 w-full h-screen"
    >
      <SignUp />
    </div>
  );
}

export default SignUpPage;
