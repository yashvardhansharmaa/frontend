module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    filter: {
      // defaults to {}
      none: "none",
      grayscale: "grayscale(1)",
      invert: "invert(1)",
      sepia: "sepia(1)",
      myBlur: "blur(8px)",
    },
    extend: {
      colors: {
        bgc: "var(--bg)",
        ibgc: "var(--ibg)",
        ft1: "var(--ft1)",
        ft2: "var(--ft2)",
        fg1: "var(--fg1)",
        primary: "var(--primary)",
        primary25: "var(--primary-25)",
        primary50: "var(--primary-50)",
        primary75: "var(--primary-75)",
        primaryNote: "var(--primary-note)",
        section: "var(--section)",
        onPrimary: "var(--text-primary)",
        main: "var(--text)",
        p100: "var(--p100)",
        p75: "var(--p75)",
        p50: "var(--p50)",
        p25: "var(--p25)",
        gbtn: "var(--gray-btn)",
        gbtnh: "var(--gray-btn-hover)",
        tcard: "var(--t-card)",
      },
      boxShadow: {
        "1dp":
          "0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.2)",
        "2dp":
          "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20)",
      },
      fontFamily: {
        heading: ["Lato", "sans-serif"],
        body: ["Poppins", "sans-serif"],
        subheading: ["Poppins", "sans-serif"],
        mont: ["Montserrat", "sans-serif"],
      },
      height: {
        "10vh": "10vh",
      },
      width: {
        "3/10": "30%",
      },
      gridTemplateColumns: {
        "3/2": "3fr 2fr",
        "2/1": "2fr 1fr",
        "1/7": "1fr 12fr",
        "1/2": "1fr 2fr",
      },
      fontSize: {
        "7xl": "5rem",
        "8xl": "6rem",
      },
      flex: {
        2: 2,
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  variants: {},
  plugins: [require("tailwindcss-filters")],
};
