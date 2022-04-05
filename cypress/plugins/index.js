/// <reference types="cypress" />
// ***********************************************************

const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');

// https://esbuild.github.io/plugins/
// TO DO
const esb = {
  name: 'esb',
  setup(build) {
    // build.onLoad({ filter: /\.\.\/src\/js\/$/ }, async (args) => {
    build.onLoad({ filter: /\.spec\.js/ }, async (args) => {
      // console.log('loading', args)
      const fs = require('fs');
      const path = require('path');
        
      let text = await fs.promises.readFile(args.path, 'utf8');
      text = text.replace(/\.\.\/src\/js/g, 'instrumented')
      .split(/\s+/).filter(x=>x);
      // console.log(text)

      return {
        contents: JSON.stringify(text),
        loader: 'json',
      }
    });
  },
}

/**
 * @type {Cypress.PluginConfig}
*/
module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config);

  // https://esbuild.github.io/api/
  const esBuildOptions = {
    define: {
      // replaces every instance of "process.env.NODE_ENV" string
      // in the spec with the string "development"
      'process.env.NODE_ENV': '"development"',
    },
  }
  
  // pass ESBuild options to be applied to each spec file
  on('file:preprocessor', createBundler(esBuildOptions));
  
  // IMPORTANT to return the config object
  // with the any changed environment variables
  return config;
}