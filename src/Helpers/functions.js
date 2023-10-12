const pool = require('./db')



async function query(query, vars) {
	return new Promise((resolve, reject) => {
		pool.query(query, vars, (error, rows, fields) => {
			if (error) return reject(error);
			return resolve(rows);
		});
	}
	)
}

module.exports = { query };