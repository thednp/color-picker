// sources
// * https://github.com/enketo/enketo-express/blob/master/tools/esbuild-plugin-istanbul.js

// const istanbul = require('istanbul-lib-coverage')
const { readFileSync } = require('fs');
const { createInstrumenter } = require('istanbul-lib-instrument');
/**
 * @typedef {import('istanbul-lib-instrument').InstrumenterOptions} InstrumenterOptions
 */

/**
 * @typedef {import('source-map').RawSourceMap} RawSourceMap
 */

const instrumenter = createInstrumenter({
  compact: false,
  esModules: true,
});

// let coverageMap = RawSourceMap;


/**
 * @return {import('esbuild').Plugin}
 */
const esbuildPluginIstanbul = () => ({
  name: 'istanbul',
  setup(build) {
    // build.onLoad({filter: /\\color-picker\\src\\js\\/ },
    build.onLoad({filter: /\/color-picker\/src\/js\// },
      async ({ path }) => {
        // const contents = String(readFileSync(path));
        // const contents = readFileSync(path, 'utf8');
        // const instrumented = await instrument(contents, path);
        const contents = String(readFileSync(path, 'utf8'));
        // const contents = (readFileSync(path, 'utf8'));

        const instrumented = instrumenter.instrumentSync(contents, path);

        return { contents: instrumented };
      }
    );
  },
});

module.exports = esbuildPluginIstanbul;
