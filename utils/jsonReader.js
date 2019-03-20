const fs = require('fs');

/**
 * read
 *
 * @param {string} url the json path to read
 */
function readJson(url) {
  return new Promise((resolve, reject) => {
    if (!url) reject('no file');

    fs.readFile(url, (err, data) => {
      if (err) reject(err);
    
      resolve(JSON.parse(data));
    })
  })
}

/**
 * write
 *
 * @param {string} url the json path to read
 * @param {Object} replace 
 */
function writeJson(url, replace = {}) {
  return new Promise((resolve, reject) => {
    readJson(url)
      .then(res => {
        const result = Object.assign({}, res, replace);

        fs.writeFile(url, JSON.stringify(result, null, 4), (err) => {
          if (err) reject(err);
          resolve();
        });
      })
  })
}

module.exports = { readJson, writeJson };