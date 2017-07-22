var filename = './data/new-test.xlsx';
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
    var i, j;

    for(i = 1, j = 1; i < data.length; i++) {
        if(data[i] == "") {
            continue;
        }

        var bookData  = {
            'bookType':             data[i][1] === undefined ? '' : data[i][1],
            'author':               data[i][3] === undefined ? '' : data[i][3],
            'publicationDate':      data[i][4] === undefined ? '' : data[i][4],
            'title':                data[i][5] === undefined ? '' : data[i][5],
            'bookName':             data[i][6] === undefined ? '' : data[i][6],
            'editor':               data[i][7] === undefined ? '' : data[i][7],
            'publishingLocation':   data[i][8] === undefined ? '' : data[i][8],
            'publisher':            data[i][9] === undefined ? '' : data[i][9],
            'period':               data[i][10] === undefined ? '' : data[i][10],
            'chapter':              data[i][11] === undefined ? '' : data[i][11],
            'page':                 data[i][12] === undefined ? '' : data[i][12],
            'department':           data[i][13] === undefined ? '' : data[i][13],
            'thesis':               data[i][14] === undefined ? '' : data[i][14],
            'ISBN':                 data[i][16] === undefined ? '' : data[i][16],
            'ISSN':                 data[i][17] === undefined ? '' : data[i][17]
        };

        DBinsert('bookData', bookData);

        var classificationData = {
            'bookId': j++,
            'typeId': data[i][1],
            'categoryId': data[i][2]
        };

        DBinsert('bookClassification', classificationData);
    }

    connection.end();
    console.log('insert book data done!');
}

function DBinsert(table, data) {
    connection.query('INSERT INTO `' + table + '` SET ?', data, function(error) {
        if(error) {
            throw error;
        }
    });
}
