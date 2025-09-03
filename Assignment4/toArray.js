var numberEntry = process.argv.slice(2);

var evenNumbers = [];

numberEntry.forEach(element => {
    if(element % 2 == 0) {
        evenNumbers.push(element)
    }
});

if (evenNumbers.length == 0) {
    console.log('The array contains: nothing');
} else {
    console.log(`The array contains: ${evenNumbers}`);

}

console.log(`The length of the array is ${evenNumbers.length}`);