"use strict";

require("dotenv").config();

const { exec } = require("child_process");

/**
 * Sends the output of Jest's lcov.info file to Coveralls.io locally. A
 * COVERALLS_REPO_TOKEN is required in the `.env` file.
 */
exec(`cat ./coverage/lcov.info | coveralls`, (err, stdout, stderr) => {
  if (err) {
    return console.error(err);
  }

  if (stdout) {
    console.log(`stdout: ${stdout}`);
  }

  if (stderr) {
    console.log(`stderr: ${stderr}`);
  }
});
