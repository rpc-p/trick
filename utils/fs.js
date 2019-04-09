const fs = require('fs');
const path = require('path');

/**
 * coryDir
 *
 * @param {string} entry
 * @param {string} output
 */
function copyDir(entry, output){
  fs.readdir(entry, (err, paths) => {
      console.log(paths)
      if(err) throw err;

      paths.forEach(item => {
        const entryPath = path.resolve(entry, item);
        const outputPath = path.resolve(output, item);

        fs.stat(entryPath, (err, stats) => {
          if (err) throw err;

          if (stats.isFile()) {
            const readable = fs.createReadStream(entryPath);
            const writable = fs.createWriteStream(outputPath);
            readable.pipe(writable);
          }
          else if (stats.isDirectory()) {
            isExistDir(outputPath);

            copyDir(entryPath, outputPath, item);
          }
        })
      })
  });
}

/**
 * judge the dir is exist
 *
 * @param {string} path
 * @param {object} options
 * @param {boolean} [options.needCreate = true] if not exist, create a new dir
 *
 */
function isExistDir(path, options = { needCreate: true }) {
  const isExist = fs.existsSync(path);
  const { needCreate } = options;

  if (!needCreate) return isExist;

  if (!isExist) {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) throw err;
    });
  }

  return isExist;
}

module.exports = { copyDir, isExistDir };