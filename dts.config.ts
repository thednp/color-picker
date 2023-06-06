const config = {
  entries: [
    {
      filePath: "./src/ts/index.ts",
      outFile: "./dist/js/color-picker.d.ts",
      noCheck: false,
      output: {
        umdModuleName: 'ColorPicker',
        noBanner: true,
      }
    },
  ],
};

module.exports = config;
