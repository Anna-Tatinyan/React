const express    = require('express');
const conn      = require('./connection');

const app = express();

conn.connect();

app.use(express.json());

app.use((req,res,next) => {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	next();
})

app.post('/', (req,res) => {
	const sql = `INSERT INTO winner_list (winner) VALUES ('${req.body.winner}')`;
	conn.query(sql, (err) => {
		if (err) throw err;
	});
})

app.get('/', (req,res) => {
	conn.query('SELECT * FROM winner_list', (err,result) => {
		res.json(result);
	});
})

app.listen(3001,() => {
	console.log("Server started on port 3001");
})
