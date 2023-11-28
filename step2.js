// Add a new function, webCat. This should take a URL and, using axios, should read the content of that URL and print it to the console.

// decides if argument is a file path or a URL and calls either cat or webCat, respectively.

const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:\n  ${err}`);
            process.exit(1);
        }
        console.log(data);
    });
}

function webCat(url) {
    axios.get(url)
        .then(response => console.log(response.data))
        .catch(err => {
            console.error(`Error fetching ${url}:\n  ${err}`);
            process.exit(1);
        });
}

const argument = process.argv[2];

if (argument.startsWith('http://') || argument.startsWith('https://')) {
    webCat(argument);
} else {
    cat(argument);
}
