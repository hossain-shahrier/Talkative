module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screen: {
      sm: "640px",
      // Media (min-width) =>640px

      md: "780px",
      // Media (min-width) =>640px

      lg: "1024px",
      // Media (min-width) =>1024px

      xl: "1280px",
      // Media (min-width) =>1280px

      "2xl": "1536px",
      // Media (min-width) =>1536px
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
