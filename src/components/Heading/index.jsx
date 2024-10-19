import React from "react";

const sizes = {
  textxs: "text-[16px] font-medium lg:text-[13px]",
  textmd: "text-[22px] font-medium lg:text-[18px]",
  textxl: "text-[28px] font-medium lg:text-[23px] md:text-[26px] sm:text-[24px]",
  headingxs: "text-[16px] font-bold lg:text-[13px]",
  headings: "text-[24px] font-bold lg:text-[20px] md:text-[22px]",
  headingmd: "text-[32px] font-semibold lg:text-[27px] md:text-[30px] sm:text-[28px]",
};

const Heading = ({ children, className = "", size = "textxs", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`text-gray-900_b2 font-dmsans ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
