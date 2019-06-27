const gitlabBaseUrl = 'https://gi-dev.ccrgt.com/api/v4';
const download = require('download-git-repo');
const cwd = require('../utils/cwd');

function create(name, repo) {
  // const os = require('os');
  // const tmpdir = path.join(os.tmpdir(), 'door-cli', name);

  return new Promise((resolve, reject) => {
    download(repo, cwd.get(), { clone: true }, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

module.exports = {
  create,
};
