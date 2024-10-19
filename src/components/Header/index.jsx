import { Heading, Img } from "./..";
import { Link } from "react-router-dom";
import React from "react";

export default function Header({ ...props }) {
  return (
    <header {...props} className={`${props.className} flex items-center bg-white shadow-md p-4`}>
      <div className="flex w-full justify-between items-center gap-5">
        {/* Wrap the Img in a Link to navigate to the home page */}
        <Link to="/">
          <Img src="https://res.cloudinary.com/dxgj7zw2w/image/upload/v1729309618/img_header_logo_mulonf.png" alt="Header Logo" className="h-[42px] w-[164px] object-contain cursor-pointer transition-transform duration-300 hover:scale-105" />
        </Link>

        <Heading
          size="textxl"
          as="p"
          className="self-end text-[28px] font-medium text-blue_gray-600 lg:text-[23px] md:text-[22px]"
        >
          <Link to="/contact" className="text-blue-600 underline hover:text-blue-800 transition-colors duration-300">Contact</Link>
        </Heading>
      </div>
    </header>
  );
}
