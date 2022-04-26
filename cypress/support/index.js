// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// require('./commands')
import './commands'

// Alternatively you can use CommonJS syntax:
import '@cypress/code-coverage/support'

import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

before(() => {
  cy.task('createTemp')
})

Cypress.Commands.add('createTemp', () => {
  const tempDir = '.nyc_output';
  const nycFilename = join(tempDir, 'out.json');
  
  if (!existsSync(tempDir)) {
    mkdirSync(tempDir, { recursive: true })
    debug('created folder %s for output coverage', tempDir)
  }
  
  
  if (!existsSync(nycFilename)) {
    writeFileSync(nycFilename, JSON.stringify({}, null, 2))
  }
})
