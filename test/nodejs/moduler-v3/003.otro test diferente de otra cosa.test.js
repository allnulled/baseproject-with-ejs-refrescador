module.exports = function() {
  return new Promise((resolve, reject) => {
    setTimeout(reject, 350);
  });
}