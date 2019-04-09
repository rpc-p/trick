const fs = require('fs');

/**
 * read
 *
 * @param {string} url the json path to read
 */
function readJson(url) {
  return new Promise((resolve, reject) => {
    if (!url) reject('no file');
    if (!fs.existsSync(url)) resolve({});

    fs.readFile(url, (err, data) => {
      if (err) reject(err);

      resolve(JSON.parse(data));
    })
  })
}

/**
 * append
 *
 * @param {string} url the json path to read
 * @param {Object} replace 
 */
function appendJson(url, replace = {}) {
  return new Promise((resolve, reject) => {
    readJson(url)
      .then(res => {
        const result = res ? Object.assign({}, res, replace) : replace;

        fs.writeFile(url, JSON.stringify(result, null, 4), (err) => {
          if (err) reject(err);
          resolve();
        });
      })
  })
}

/**
 * write
 *
 * @param {string} url the json path to read
 * @param {Object} content 
 */
function writeJson(url, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(url, JSON.stringify(content, null, 4), (err) => {
      if (err) reject(err);
      resolve();
    });
  })
}

module.exports = { readJson, appendJson, writeJson };