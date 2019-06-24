const gitlabBaseUrl = 'https://gi-dev.ccrgt.com/api/v4';
const cwd = require('../utils/cwd');

function create(name, repo) {
  // const os = require('os');
  // const tmpdir = path.join(os.tmpdir(), 'door-cli', name);
  const download = require('download-git-repo');
  return new Promise((resolve, reject) => {
    download(repo, cwd.get(), { clone: true }, function(err) {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

module.exports = {
  create
};
