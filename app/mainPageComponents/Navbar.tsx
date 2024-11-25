"use client";

import React from "react";
import AppIcon from "../SVG_Icons/AppIcon";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import LogoAnName from "../Components/LogoAnName";

function Navbar() {
  const { userId } = useAuth();
  const defaultColor = "#E30B5C";
  const backgroundColorObject = { backgroundColor: defaultColor };
  return (
    <header>
      <div className=" p-8 md:px-20  ">
        <div className="flex items-center justify-between ">
          <div className="text-center  sm:text-left ">
            {/* Icon + Name of The App */}
            {/* ----------------------- */}
            <LogoAnName home={true} />
          </div>
          {/*  */}
          {/* The buttons */}

          <div>
            {userId ? (
              <Link href={"/dashboard"}>
                <button
                  style={backgroundColorObject}
                  className={`block test-sm md:text-base   rounded-lg  px-5 py-2 md:px-9 md:py-3 text-sm font-medium text-white transition   
               `}
                  type="button"
                >
                  Dashboard
                </button>
              </Link>
            ) : (
              <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                <Link href={"/sign-in"}>
                  <button
                    style={backgroundColorObject}
                    className={`block sm:w-32 w-full rounded-lg  px-5 py-2 md:px-9 md:py-3 text-sm font-medium text-white transition   focus:outline-none  `}
                    type="button"
                  >
                    Sign In
                  </button>
                </Link>

                <Link href={"/sign-up"}>
                  <button
                    className={`block sm:w-32 w-full border rounded-lg  px-5 py-2 md:px-9 md:py-3 text-sm font-medium   transition   
              focus:outline-none hover:bg-customRed hover:text-white  border-customRed text-customRed `}
                    type="button"
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
