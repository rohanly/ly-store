import React from "react";
import heroImg from "@/assets/images/hero.webp";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="h-[90vh] w-full relative">
      <div className="text-white absolute inset-0 z-10 flex flex-col justify-center items-start gap-4 p-32 text-center">
        <h1 className="text-5xl font-semibold md:drop-shadow shadow-black">
          Summer styles are finally here
        </h1>
        <p className="text-base max-w-md mb-6 md:drop-shadow shadow-black">
          This year, our new summer collection will shelter you from the harsh
          elements of a world that doesn't care if you live or die.
        </p>
        <div className="mt-6 w-fit">
          <Link
            className="flex items-center text-xl border-b border-current gap-x-4 py-2 transition-all duration-300 group hover:pl-4 hover:pr-1"
            to="/store"
          >
            Explore products
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <img
        src={heroImg}
        alt="Hero Banner Image"
        className="w-full h-full absolute inset-0 object-cover opacity-95"
      />
    </div>
  );
};

export default HeroSection;
