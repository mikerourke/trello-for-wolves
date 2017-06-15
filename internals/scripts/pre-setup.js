/**
 * Removes the node_modules folder prior to running the setup script from
 *    package.json.  This is done to ensure the directory is deleted.  I
 *    couldn't use rimraf because it's in the node_modules folder.
 */

/* External dependencies */
const fs = require('fs');
const path = require('path');

const deleteFile = (folderPath, file) => new Promise((resolve, reject) => {
    const filePath = path.join(folderPath, file);
    fs.lstat(filePath, (error, stats) => {
      if (error) {
        return reject(error);
      }
      if (stats.isDirectory()) {
        resolve(deleteDirectory(filePath));
      } else {
        fs.unlink(filePath, function (error) {
          if (error) {
            return reject(error);
          }
          resolve();
        });
      }
    });
  });

const deleteDirectory = (folderPath) => new Promise((resolve, reject) => {
    fs.access(folderPath, (error) => {
      if (error) {
        return reject(error);
      }
      fs.readdir(folderPath, (error, files) => {
        if (error) {
          return reject(error);
        }
        Promise.all(files.map(file => deleteFile(folderPath, file)))
          .then(() => {
            fs.rmdir(folderPath, (error) => {
              if (error) {
                return reject(error);
              }
              resolve();
            });
          })
          .catch(reject);
      });
    });
  });

const nodeModules = path.resolve(`${process.cwd()}/node_modules`);
if (fs.existsSync(nodeModules)) {
  console.log('Deleting node_modules folder, this might take a minute...');
  deleteDirectory(nodeModules)
    .then(() => console.log('Directory deleted'))
    .catch(error => console.error(`Error occurred: ${error}`));
} else {
  console.log("The node_modules folder wasn't found, so you're good!")
}
