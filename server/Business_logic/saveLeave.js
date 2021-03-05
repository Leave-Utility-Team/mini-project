var moment = require('moment');
var fs = require('fs');
const dbConfig = require('../database-confiq/config');
const connection = require('../database-confiq/connection');
const query = require('../database-confiq/query');

module.exports = async (_start, _end, empId) => {

    const conn = await connection(dbConfig).catch(e => { });
    var requiredThreshold = await query(conn, 'insert into leaves values("' + _start + '","' + _end + '",' + empId + ')').catch(console.log);
}

