module.exports = {
  mode: "jit",
  content: ["./src/**/**/*.{js,ts,jsx,tsx,html,mdx}", "./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    screens: { lg: { max: "1440px" }, md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        black: { 900: "var(--black_900)" },
        blue: { a700: "var(--blue_a700)", a700_b2: "var(--blue_a700_b2)" },
        blue_gray: {
          100: "var(--blue_gray_100)",
          400: "var(--blue_gray_400)",
          600: "var(--blue_gray_600)",
          700: "var(--blue_gray_700)",
          "100_01": "var(--blue_gray_100_01)",
          "700_b2": "var(--blue_gray_700_b2)",
        },
        deep_purple: { a200: "var(--deep_purple_a200)" },
        gray: {
          100: "var(--gray_100)",
          300: "var(--gray_300)",
          500: "var(--gray_500)",
          700: "var(--gray_700)",
          "500_01": "var(--gray_500_01)",
          "500_02": "var(--gray_500_02)",
          "900_b2": "var(--gray_900_b2)",
        },
        green: { 700: "var(--green_700)" },
        indigo: { a200: "var(--indigo_a200)" },
        white: { a700: "var(--white_a700)" },
      },
      boxShadow: {},
      fontFamily: { dmsans: "DM Sans" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
