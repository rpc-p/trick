#! /usr/bin/env node
const program = require('commander');

const config = require('../helper/config');
const { DEFAULT_TRICK_FOLDER_PATH } = require('../constant/default');
const packageJson = require('../package.json');

const { build } = require('./build');
const { env } = require('./env');
const { init } = require('./init');

program
  .usage('[option]', '--type required')
  .option('-c, --configPath <path>', 'The path of config file', `${DEFAULT_TRICK_FOLDER_PATH}/trick.js`)
  .version(packageJson.version, '-v, --version')
  
program
  .command('build [version]')
  .description('Add upgraded version on the original basis')
  .action((version) => {
    config.init(program.configPath)
      .then(() => build(version));
  })

program
  .command('env [environment]')
  .description('Switch environment')
  .action((environment) => {
    config.init(program.configPath)
      .then(() => env(environment));
  })

program
  .command('init [outputPath]')
  .description('Init config')
  .action((outputPath) => init(outputPath));

program.parse(process.argv);

