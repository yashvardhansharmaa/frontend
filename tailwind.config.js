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
        primary: "var(--primary)",
        onPrimary: "var(--text-primary)",
        main: "var(--text)",
      },
    },
  },
  variants: {},
  plugins: [],
};
