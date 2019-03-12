var fileUrls = [
  'http://example.com/file1.txt',
  'http://example.com/file2.txt'
];
var promisedTexts = fileUrls.map(httpGet);

Promise.all(promisedTexts)
.then(function (texts) {
    texts.forEach(function (text) {
        console.log(text);
    });
})
.catch(function (reason) {
    // Receives first rejection among the promises
});