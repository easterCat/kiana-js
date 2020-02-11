const fs = require("fs-extra");
const path = require("path");
const jsdoc2md = require("jsdoc-to-markdown");
jsdoc2md
    .render({
        "example-lang": "javascript",
        files: path.resolve(process.cwd(), "./switchSecond.js"),
        "name-format": "backticks"
    })
    .then(x => {
        fs.outputFile(path.resolve(process.cwd(), "./switchSecond.md"), x);
    });
