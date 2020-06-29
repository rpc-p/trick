#! /usr/bin/env node
const program = require('commander');

const config = require('../helper/config');
const packageJson = require('../package.json');

const { compress } = require('./compress');
const { env } = require('./env');
const { init } = require('./init');

program
  .usage('[option]', '--type required')
  .option('-c, --configPath <path>', 'The path of config file', './trick.js')
  .version(packageJson.version, '-v, --version')
  
program
  .command('cs [version]')
  .description('Compress files')
  .option('-o, --open', 'open zip file')
  .action(compress)

program
  .command('env [environment]')
  .description('Switch environment')
  .action((environment) => {
    config.init(program.configPath)
      .then(() => env(environment));
  })

program
  .command('init')
  .description('Init config')
  .action(() => init());

program.parse(process.argv);

