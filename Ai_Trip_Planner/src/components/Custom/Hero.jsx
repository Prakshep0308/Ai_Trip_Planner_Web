import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col items-center mx-54 gap-9 mt-40">
      <h1 className="font-extrabold text-[60px] text-center mt-16 text-[#624a46]">
        <span className="text-[#f14e23]">
          Discover Your Next Advanture With AI:
        </span>
        Personalized Itineraries At Your Fingertips
      </h1>
      <p className="text-xl text-[#624a46] text-center">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>
      <Link to={"/create-trip"}>
        <Button className="bg-[#624a46] h-18 w-56 text-[20px] text-white mt-20">
          Get Started, It's Free
        </Button>
      </Link>
    </div>
  );
};

export default Hero;
