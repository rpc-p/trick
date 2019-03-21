const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const inquirer = require('inquirer');

const { readJson } = require('../utils/jsonReader');
const { formattedContent } = require('../utils/formattedContent');
const { log, success, warning, error, ing } = require('../utils/chalk');

const cfgPath = path.resolve('./trick.json');

function env() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'env',
      choices: ['dev', 'test', 'prod'],
      default: 'dev',
      message: 'Which environment do you want?',
    },
  ])
    .then(answers => {
      const { env: switchEnv } = answers;

      readJson(cfgPath)
        .then(res => {
          const {
            env,
            env: {
              outputPath,
              basicPath,
              mockPath,
            }
          } = res;

          const { host, port, path, name = 'SERVER_ADDRESS' } = env[switchEnv];

          // query content of path
          const baseContent = basicPath ? fs.readFileSync(basicPath).toString() : '';
          const envContent = path ? fs.readFileSync(path).toString() : '';
          const envServer = `var ${name} = '${host}:${port}';`;

          const result = formattedContent(baseContent, envServer, envContent);

          fs.writeFile(outputPath, result, err => {
            if (err) throw err;

            log(success(`Successful! The current environment is ${warning(switchEnv)}`));
          });

          // if having mockPath
          if (mockPath) {
            const mockContent = formattedContent(envServer, `module.exports = ${name};`)

            fs.writeFile(mockPath, mockContent, err => {
              if (err) throw err;

              const mock = spawn('sdk-mock', [], {});

              log(ing('Execute the sdk-mock command......'));

              mock.stdout.on('data', (data) => {
                log(success(`trick standard output: ${data}`));
              });
              
              mock.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
              });
              
              mock.on('close', (code) => {
                log(error(`child process exited with code ${code}`));
              });
            })
          }
        })
    })
}

module.exports = { env };