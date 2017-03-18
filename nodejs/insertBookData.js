var filename = './data/test.csv';
var configs = require('./config.js');
var fs = require('fs');
var lineReader = require('readline').createInterface({
    input: fs.createReadStream(filename)
});
var mysql = require('mysql');
var connection = mysql.createConnection(configs.mysql());

// mysql connect
connection.connect();
readFile();

function readFile() {

    // read file start
    lineReader.on('line', function (line) {
        var insertData = {
            'bookType': line.split(',')[1],
            'author': line.split(',')[2],
            'publicationDate': line.split(',')[3],
            'title': line.split(',')[4],
            'bookName': line.split(',')[5],
            'editor': line.split(',')[6],
            'publishingLoction': line.split(',')[7],
            'publisher': line.split(',')[8],
            'period': line.split(',')[9],
            'chapter': line.split(',')[10],
            'page': line.split(',')[11],
            'department': line.split(',')[12],
            'thesis': line.split(',')[13],
            'ISBN': line.split(',')[15],
            'ISSN': line.split(',')[16]
        };

        DBinsert(insertData);
    });

    // read file end
    lineReader.on('close', function () {
        console.log('insert book data done!');
        connection.end();
    });
}

function DBinsert(data) {
    connection.query('INSERT INTO `bookData` SET ?', data, function(error) {
        if(error) {
            throw error;
        }
    });
}