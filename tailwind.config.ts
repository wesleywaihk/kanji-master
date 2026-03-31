import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sakura: {
          dusk: "#505477",
          iris: "#616c99",
          bloom: "#fcddf2",
          coral: "#ffc2c2",
          mist: "#ffdede"
        }
      },
      boxShadow: {
        sakura: "0 20px 50px rgba(80, 84, 119, 0.18)"
      },
      backgroundImage: {
        "sakura-glow":
          "radial-gradient(circle at top, rgba(252, 221, 242, 0.95), rgba(255, 255, 255, 0) 45%), linear-gradient(135deg, rgba(255, 222, 222, 0.95), rgba(252, 221, 242, 0.7))"
      }
    }
  },
  plugins: []
};

export default config;
