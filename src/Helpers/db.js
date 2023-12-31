var mysql = require('mysql');

var pool      =    mysql.createPool({
    host: '67.227.144.116',
    user: 'intellyt_andresDelgado',
    password: 'zUy~+X#0U{WA',
    database: 'intellyt_build2sip',
    dateStrings:true,
    debug    :  false,
    multipleStatements: true,
    rejectUnauthorized:true,
  
});



pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
})

module.exports = pool;
