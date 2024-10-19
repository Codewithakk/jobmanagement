import React from "react";

const sizes = {
  texts: "text-[20px] font-normal not-italic lg:text-[17px]",
  textlg: "text-[24px] font-normal not-italic lg:text-[20px] md:text-[22px]",
  text2xl: "text-[32px] font-normal not-italic lg:text-[27px] md:text-[30px] sm:text-[28px]",
};

const Text = ({ children, className = "", as, size = "text2xl", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-black-900 font-dmsans ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
