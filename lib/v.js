const exec = require('child_process').exec;

function v(value) {
  exec(`npm version ${value}`, (err) => {
    if (err) throw err;
  });
}

module.exports = { v };