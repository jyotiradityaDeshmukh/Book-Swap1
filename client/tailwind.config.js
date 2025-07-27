module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {},
  },
  theme: {
    screens: { mob: { min: "0px", max: "455px" } },
  },
  plugins: [require("flowbite/plugin")],
};
