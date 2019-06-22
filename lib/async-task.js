module.exports.toPromise = function(taskFunc) {
  return new Promise((resolve, reject) => {
    taskFunc();
    resolve();
  });
};
