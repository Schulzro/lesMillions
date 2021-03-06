const fs = require('fs');
var numbers = [1, 2, 3, 5, 6, 7, 8, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 25, 28,
    29, 30, 31, 32, 33, 35, 37, 38, 39, 40, 41, 42, 44, 46, 47, 48, 49, 50];

var hotNumbers = [26, 27, 24, 22, 9, 43, 34, 45, 4, 36, 11];

var starNumbers = [2, 4, 5, 6, 7, 8, 9, 10, 12];

var hotStarNumbers = [11, 3, 1];

const allNumbers = Array.from({ length: 50 }, (_, i) => i + 1);

const allStars = Array.from({ length: 12 }, (_, i) => i + 1);

const gridNumberPerParticipant = 10;

const participants = ['Delphine', 'Gabrielle', 'Pierre', 'Charles', 'Jules', 'François', 'Colin', 'Benjamin', 'Michel']

var myargs = process.argv.slice(2);
if (myargs[0] == "-g") {
    console.log(myargs[1]);
    const data = readFromDatabase();
    generateDataFor(data, myargs[1]);
    writeToDatabase(data);
}


function generateDataFor(data, newName) {
    const grids = [];
    for (let index = 0; index < gridNumberPerParticipant; index++) {
        const grid = generateNumbers(5, numbers, hotNumbers);
        const stars = generateNumbers(2, starNumbers, hotStarNumbers);
        grids.push({ grid: grid, stars: stars });
    }
    data.table.push({ name: newName, grids: grids });
    return data;
}

function generateSequenceForMichel(length, numbers) {
    let sequence = "";
    const copyNumbers = [...numbers];
    for (let k = 0; k < length; k++) {
        let index = getArrayIndex(copyNumbers);
        sequence += copyNumbers[index] + " ";
        copyNumbers.splice(index, 1);
    }
    return sequence.trim();
}


function generateNumbers(length, numbers, hotNumbers) {
    const copyHotNumbers = [...hotNumbers];
    const copyNumbers = [...numbers];
    let sequence = "";
    for (let k = 0; k < length; k++) {
        isHotNumber = Math.random() <= 1 / 3;
        let index = isHotNumber ? getArrayIndex(copyHotNumbers) : getArrayIndex(copyNumbers);
        sequence += (isHotNumber ? copyHotNumbers[index] : copyNumbers[index]) + " ";
        isHotNumber ? copyHotNumbers.splice(index, 1) : copyNumbers.splice(index, 1);
    }
    return sequence.trim();
}

function getArrayIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function readFromDatabase() {
    let rawdata = fs.readFileSync('../lesMillions/src/app/database/data.json');
    return JSON.parse(rawdata);
}

function writeToDatabase(data) {
    fs.writeFile('../lesMillions/src/app/database/data.json', JSON.stringify(data), (err) => {
        if (err) throw err;
    });
}