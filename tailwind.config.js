module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        bgc: "var(--bg)",
        ibgc: "var(--ibg)",
        ft1: "var(--ft1)",
        ft2: "var(--ft2)",
        fg1: "var(--fg1)",
        primary: "var(--primary)",
        onPrimary: "var(--text-primary)",
        main: "var(--text)",
        p100: "var(--p100)",
        p75: "var(--p75)",
        p50: "var(--p50)",
        p25: "var(--p25)",
      },
      boxShadow: {
        "1dp":
          "0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.2)",
        "2dp":
          "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20)",
      },
      fontFamily: {
        heading: ["Bebas Neue", "cursive"],
        body: ["Lato", "sans-serif"],
      },
      height: {
        "10vh": "10vh",
      },
      gridTemplateColumns: {
        "3/2": "3fr 2fr",
        "2/1": "2fr 1fr",
        "1/7": "1fr 12fr",
      },
      fontSize: {
        "7xl": "5rem",
      },
    },
  },
  variants: {},
  plugins: [],
};
