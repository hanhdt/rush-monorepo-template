let common = [
  'test/cucumber/features/**/*.feature',               // Specify our feature files
  '--publish-quiet',                          // disable this message
  '--require-module ts-node/register',        // Load TypeScript module
  '--require test/cucumber/step-definitions/**/*.ts',  // Load step definitions
  '--format @cucumber/pretty-formatter',      // Load custom formatter
  '--format-options {"theme":{"feature keyword":["magenta","bold"],"feature name":["bold"],"scenario keyword":["magenta","bold"],"scenario name":["bold"],"step keyword":["green","bold"],"step text":["greenBright","italic"],"tag":["green"]}}'
].join(' ');

module.exports = {
  default: common
};