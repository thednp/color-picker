/// <reference types="cypress" />
// ***********************************************************

const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');

const { join } = require('path');
const { existsSync, mkdirSync, writeFileSync } = require('fs');
const debug = require('debug')('code-coverage')

const createTemp = () => {
  const tempDir = '.nyc_output';
  const nycFilename = join(tempDir, 'out.json');
  
  if (!existsSync(tempDir)) {
    mkdirSync(tempDir, { recursive: true })
    debug('created folder %s for output coverage', tempDir)
  }
  
  
  if (!existsSync(nycFilename)) {
    writeFileSync(nycFilename, JSON.stringify({}, null, 2))
  }
}

/**
 * @type {Cypress.PluginConfig}
*/
module.exports = (on, config) => {
  
  // https://esbuild.github.io/api/
  const esBuildOptions = {
    define: {
      // replaces every instance of "process.env.NODE_ENV" string
      // in the spec with the string "development"
      'process.env.NODE_ENV': '"development"' // or '"production"' to minify output
    },
    plugins: [require('./esbuild-istanbul')()]
  }
    
  // pass ESBuild options to be applied to each spec file
  on('file:preprocessor', createBundler(esBuildOptions));
  on('before:run', () => {
    // cy.task('createTemp')
    createTemp()
  })
    
  require('@cypress/code-coverage/task')(on, config);

  // IMPORTANT to return the config object
  // with the any changed environment variables
  return config;
}
