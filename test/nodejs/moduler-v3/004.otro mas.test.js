module.exports = function() {
  return new Promise((resolve, reject) => {
    setTimeout(reject(new Error("Whatever")), 350);
  });
}