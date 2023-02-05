module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend:
    {
      fontFamily: {
        SkModernist: ["Sk-Modernist"],
        SkModernistBold: ["Sk-Modernist-bold"],
        SkModernistMono: ["Sk-Modernist-mono"],
        Caveat: ["Caveat"],
        kawshan: ["kaushanScript-Regular"],
        montserrat: ["Montserrat-Regular"],
        montserratItalic: ["Montserrat-Italic-VariableFont_wght"],
        montserratBold: ["Montserrat-Bold"],

      },
    },
  },

  plugins: [require("kutty")],
};
