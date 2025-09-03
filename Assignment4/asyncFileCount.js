var fs = require('fs');
var path = require('path');

var directory = process.argv[2];
var fileExtention = process.argv[3];

var count = 0;

fs.readdir(directory, function(err, files) {
    if (err) {
        console.log(err)
    } else {
        files.forEach(element => {
            if (path.extname(element) == fileExtention) {
                count++;
            }
        });

        if (count == 0) {
            console.log(`There are no files in the ${directory} directory containing the file extention ${fileExtention}`);
        } else {
            console.log(`There are ${count} files countaining the file extention ${fileExtention}`);
        }
    }
});
