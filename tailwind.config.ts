import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Extracted from Home Dashboard (Figma node 41:623)
        ink: {
          900: "#1A243A", // primary text / heading
          700: "#292D32", // borders dark
          500: "#757E91", // secondary text
        },
        brand: {
          500: "#0099FF",
          300: "#59BDFF",
        },
        surface: {
          0: "#FFFFFF",
          50: "#F9F9F9",
          100: "#F5F5F5",
          200: "#F1F1F1", // PageShell bg
          250: "#EFEEF1",
        },
        line: {
          100: "#F1F1F1",
          200: "#EBEBEB",
          300: "#E1E1E1",
          400: "#979797",
        },
        danger: { 500: "#FF3B30" },
      },
      borderRadius: {
        DEFAULT: "8px",
        sm: "8px",
        md: "12px",
        lg: "14px",
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
        "4xl": "26px",
        pill: "9999px",
      },
      boxShadow: {
        soft: "0 4px 4px rgba(0,0,0,0.06)",
        lifted: "0 4px 12px rgba(0,0,0,0.04)",
        "lifted-md": "0 4px 12px rgba(0,0,0,0.08)",
        edge: "0 1px 1px rgba(0,0,0,0.08)",
        "glass-l": "inset 4px 0 16px rgba(255,255,255,1)",
        "glass-r": "inset -4px 0 16px rgba(255,255,255,1)",
        "brand-l": "inset 4px 0 16px rgba(0,153,255,0.12)",
        "brand-r": "inset -4px 0 16px rgba(17,17,17,0.12)",
      },
      fontFamily: {
        sans: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Normalized scale — sm and base both 14px (Figma body), so they're interchangeable.
        // Removes the 13/14 inconsistency that caused subtle text-size drift across pages.
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["14px", { lineHeight: "20px" }],
        md: ["16px", { lineHeight: "22px" }],
        lg: ["20px", { lineHeight: "26px" }],
        xl: ["24px", { lineHeight: "30px" }],
        "2xl": ["32px", { lineHeight: "38px" }],
        display: ["40px", { lineHeight: "48px", letterSpacing: "-0.02em" }],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(180deg, #59BDFF 0%, #0099FF 100%)",
        "metal-gradient": "linear-gradient(180deg, #505050 0%, #797979 100%)",
        "shell-gradient": "linear-gradient(180deg, #F7F7F7 0%, #FFFFFF 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
