var fs = require('fs');

//Check that only one argument is entered name is entered
var argument = process.argv;
argument.forEach(element => {
    if (argument.length != 3) {
        console.log('Only one args should be entered');
        process.exit(1);
    }
});

var dataFile = process.argv[2];
var data = [];

//Read File 
try {
    data = fs.readFileSync(dataFile,'utf8').split('\n');
} catch (error) {
    console.log('The File entered cannot be read.');
    process.exit(1);
}

//Check is there is more than 3 lines
if (data.length < 3) {
    console.log('There should be a minimum of 3 lines in the file ' + dataFile);
    process.exit(1);
}

var dataOutput = {
    'fname:': data[0].trim(),
    'lname:': data[1].trim(), 
    'location:': data[2].trim(), 
    'other:': (data.length > 3? data.slice(3).join(' ').trim() : 'N/A')
}

console.log(dataOutput); 