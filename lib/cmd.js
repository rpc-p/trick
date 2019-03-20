#! /usr/bin/env node
const program = require('commander');
const exec = require('child_process').exec;
const path = require('path');

const { compress } = require('./compress');
const { init } = require('./init');

program
  .usage('[option]', '--type required')
  .version('0.0.1', '-v, --version')
  // .option('-c, --compress', 'Add peppers')
  // .option('-P, --pineapple', 'Add pineapple')
  // .option('-b, --bbq-sauce', 'Add bbq sauce')
  // .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble');

program
  .command('init')
  .description('init config')
  .action(() => {
    init();
  })

program
  .command('cps')
  .description('compress files')
  // .option("-c, --compress <mode>", "Which setup mode to use", { isDefault: true })
  .action((env, options) => {
    compress();
  })

program.parse(process.argv);

// if (program.compress) {
//   execFile(path.resolve(__dirname, './compress.js'));
//   console.log('  - pineappleddddd')
// }

// console.log('you ordered a pizza with:');
// if (program.peppers) console.log('  - peppers');
// if (program.pineapple) console.log('  - pineapple');
// if (program.bbqSauce) console.log('  - bbq');
// console.log('  - %s cheese', program.cheese);