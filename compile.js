// ColorPicker | Compile SCSS Script
// Build script to compile and minify the CSS file from SCSS folder
// Usage: npm run compile-scss

const fs = require("fs");
const writeFileSync = fs.writeFileSync;
const sass = require("sass");
const pkg = require("./package.json");
const year = new Date().getFullYear();
const args = {};

const ARGS = process.argv.slice(-1)[0].split(",");
ARGS.map((x) => {
  const [name, value] = x.split(":");
  args[name] = value;
});

const RTL = args.DIR === "rtl" ? "RTL " : "";
const banner =
  args.MIN === "true"
    ? `/* ColorPicker ${RTL}v${pkg.version} | ${pkg.author} © ${year} | ${pkg.license}-License */`
    : `/*!
* ColorPicker v${pkg.version} (${pkg.homepage})
* Copyright ${year} © ${pkg.author}
* Licensed under MIT (${pkg.license}/blob/main/LICENSE)
*/`;

const DIR = args.DIR === "rtl" ? ".rtl" : "";
const MIN = args.MIN === "true" ? ".min" : "";
const INPUTFILE = args.INPUTFILE
  ? args.INPUTFILE
  : `./src/scss/color-picker${DIR}.scss`;
const OUTPUTFILE = args.OUTPUTFILE
  ? args.OUTPUTFILE
  : `./dist/css/color-picker${DIR}${MIN}.css`;
const COMPRESS = args.MIN === "true" ? "compressed" : "expanded";

// Helper Functions
function compile(inputPath, writePath, compressType) {
  const result = sass.compile(inputPath, {
    style: compressType,
    loadPaths: ["src/scss"],
  });
  writeFileSync(writePath, `${banner}\n` + result.css.toString());
  console.log(`✅ Compiled ${inputPath} to ${writePath}.`);
}

compile(INPUTFILE, OUTPUTFILE, COMPRESS);
