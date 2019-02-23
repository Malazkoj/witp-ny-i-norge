// Jest doesn't understand ES6 without transpile.
// To help Jest running our test classes, we have to import them here with esmImport()
//
const esmImport = require('esm')(module);

// Define here the tests to be run by Jest
//-----------------------------------------

/*
 IMPORTANT: the test files MUST NOT be recognized as test-files by Jest
  that's why they are named with the suffix 'assert' and not 'test'
  run the teste from the command line with `npm test`
*/

// The first test suite is tests running on the server-side code
const test_suite_1 = esmImport('./api-utils.assert');

// The second test suite is tests running on the client-side code (browser)
const test_suite_2 = esmImport('./client-app-utils.assert');