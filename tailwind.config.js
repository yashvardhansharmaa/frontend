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
        fg1: "var(--fg1)",
        fg2: "var(--fg2)",
        primary: "var(--primary)",
        onPrimary: "var(--text-primary)",
        main: "var(--text)",
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
    },
  },
  variants: {},
  plugins: [],
};
