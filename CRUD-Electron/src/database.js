const mysql = require('promise-mysql');

const conecction = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'electroncrud'
})

function getConnection(){
    return conecction;
}

module.exports = {getConnection}