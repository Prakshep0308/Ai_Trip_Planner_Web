import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-100 shadow p-4 sm:p-6 mt-20">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="h-8 mr-3" />
          <span className="text-xl font-semibold text-gray-800">
            plan<span className="text-[#f14e23] font-bold">MY</span>trip
          </span>
        </div>

        <ul className="flex mt-4 sm:mt-0 space-x-6 text-gray-600">
          <li>
            <a href="#" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>

      <hr className="my-6 border-gray-300" />
      <div className="text-center text-gray-500">
        © 2024 plan<span className="font-bold text-[#f14e23]">MY</span>trip™.
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
