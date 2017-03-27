var filename = './data/test.xlsx';
var configs = require('./config.js');
var xlsx = require('node-xlsx');
var mysql = require('mysql');
var connection = mysql.createConnection(configs.mysql());

// mysql connect
connection.connect();
readFile();

function readFile() {

    // parses a file
    var data = xlsx.parse(filename)[0]['data'];
    var i;
    for(i = 1; i < data.length; i++) {
        var insertData = {
            'bookType': data[i][1] === undefined ? '' : data[i][1],
            'author': data[i][2] === undefined ? '' : data[i][2],
            'publicationDate': data[i][3] === undefined ? '' : data[i][3],
            'title': data[i][4] === undefined ? '' : data[i][4],
            'bookName': data[i][5] === undefined ? '' : data[i][5],
            'editor': data[i][6] === undefined ? '' : data[i][6],
            'publishingLocation': data[i][7] === undefined ? '' : data[i][7],
            'publisher': data[i][8] === undefined ? '' : data[i][8],
            'period': data[i][9] === undefined ? '' : data[i][9],
            'chapter': data[i][10] === undefined ? '' : data[i][10],
            'page': data[i][11] === undefined ? '' : data[i][11],
            'department': data[i][12] === undefined ? '' : data[i][12],
            'thesis': data[i][13] === undefined ? '' : data[i][13],
            'ISBN': data[i][15] === undefined ? '' : data[i][15],
            'ISSN': data[i][16] === undefined ? '' : data[i][16]
        };

        DBinsert(insertData);
    }

    connection.end();
    console.log('insert book data done!');
}

function DBinsert(data) {
    connection.query('INSERT INTO `bookData` SET ?', data, function(error) {
        if(error) {
            throw error;
        }
    });
}