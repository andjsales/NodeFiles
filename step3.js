// Add a feature where, on the command line, you can optionally provide an argument to output to a file instead of printing to the console. The argument should look like this: --out output-filename.txt readfile-or-url.

// Current features should still work the same:

const fs = require('fs');
const axios = require('axios');


function writeToFile(content, filename) {
    fs.writeFile(filename, content, 'utf8', err => {
        if (err) {
            console.error(`Couldn't write ${filename}:\n  ${err}`);
            process.exit(1);
        }
    });
}

const args = process.argv.slice(2);
if (args[0] === '--out') {
    const outputFile = args[1];
    const input = args[2];

    const handleContent = (content) => writeToFile(content, outputFile);

    if (input.startsWith('http://') || input.startsWith('https://')) {
        axios.get(input).then(response => handleContent(response.data));
    } else {
        fs.readFile(input, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading ${input}:\n  ${err}`);
                process.exit(1);
            }
            handleContent(data);
        });
    }
} else {
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
}

