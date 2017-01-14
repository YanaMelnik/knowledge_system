var fs = require('fs');

var foldersWithStaticContent = ['images', 'script', 'stylesheet', 'html'];
var destination = "lib/mappings/";
var mappingTemplate = '{\n  "request": {\n    "method": "GET",\n    "url": "filePath"\n  },\n  "response": {\n    "status": 200,\n    "bodyFileName": "../..filePath"\n  }\n}';

fs.readdir(__dirname, function (err, files) {
    files.forEach(function (file) {
        if (foldersWithStaticContent.indexOf(file) > -1) {
            createMappings(__dirname + '/' + file)
        }
    })
});

function createMappings(dir) {
    fs.readdir(dir, function (err, files) {
        if (err) {
            console.log(err);
            return;
        }
        files.forEach(function (file) {
            processFile(dir + '/' + file)
        });
    })
}

function processFile(file) {
    fs.stat(file, function (err, stats) {
        if (err) {
            console.log(err);
            return;
        }
        if (stats.isDirectory()) {
            return createMappings(file);
        }
        createMappingForFile(file);
    })
}

function createMappingForFile(file) {
    var relativeName = file.substr(__dirname.length);
    var mapping = mappingTemplate.replace(/filePath/g, relativeName);
    var mappingFileName = relativeName.replace(/\//g, '_') + '.json';
    fs.writeFile(destination + mappingFileName, mapping, function (err) {
        if (err)
            console.log(err);
        else
            console.log("Created mapping for " + file);

    });
}
