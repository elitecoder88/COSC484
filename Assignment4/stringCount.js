var fs = require('fs');

var wordCount = ['towson', 'cis', 'web', 'development'];

var dataFile = process.argv[2];

var data = fs.readFileSync(dataFile,'utf8');

var lowerCaseData = data.toLowerCase();

var dataWords = lowerCaseData.split(/\W+/)

var count = 0;

for (var word of dataWords) {
    if (wordCount.includes(word)) {
        count++;
    }
}

console.log(count);
