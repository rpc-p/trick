#! /usr/bin/env node
const program = require('commander');

const compress = require('./compress');
const { env } = require('./env');
const { init } = require('./init');
const { v } = require('./v');

program
  .usage('[option]', '--type required')
  .version('0.0.1', '-v, --version')
  
program
  .command('cs [version]')
  .description('Compress files')
  // .option('-o, --open', 'open zip file')
  .option('-p, --pure', 'pure compress')
  .action((version, options) => {
    compress(version, options);
    // console.log(cmd.open);
  })

program
  .command('v [version]')
  .description('duplicate npm version')
  .action((version) => v(version))

program
  .command('env')
  .description('switch environment')
  .action(() => env())

program
  .command('init')
  .description('Init config')
  .action(() => init())

program.parse(process.argv);
