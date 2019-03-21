#! /usr/bin/env node
const program = require('commander');

const { compress } = require('./compress');
const { env } = require('./env');
const { init } = require('./init');

program
  .usage('[option]', '--type required')
  .version('0.0.1', '-v, --version')
  
program
  .command('cs [version]')
  .description('Compress files')
  .option('-o, --open', 'open zip file')
  .action((version, cmd) => {
    compress(version);
    // console.log(cmd.open);
  })

program
  .command('env')
  .description('Switch environment')
  .action(() => env())

program
  .command('init')
  .description('Init config')
  .action(() => init())

program.parse(process.argv);
