const mysql = require('mysql');
const express = require('express');
const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

const con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'library'
});
con.connect((e) => {
    if(e){ throw e; }
    else{ console.log('Connected to database') }
});

app.get('/api/books', (req, res) => { 
    con.query('SELECT * FROM books', (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    })
}); 
app.get('/api/books/:id', (req, res) => { 
    con.query(`SELECT * FROM books where id = ${req.params.id}`, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    });
}); 
app.post('/api/books', (req, res) => {
    con.query(`INSERT INTO books (title, author) VALUES ('${req.body.title}', '${req.body.author}')`, (err, result) => {
        if(err) {
            res.send(err);
        }
        res.send(result);
    });
});
app.put('/api/books/:id', (req, res) => {
    con.query(`UPDATE books SET title = '${req.body.title}', author = '${req.body.author}' WHERE ID ='${req.params.id}'`, (err, result) => {
        if(err) {
            res.send(err);
        }
        res.send(result);
    })    
});
app.delete('/api/books/:id',(req, res) => {
    con.query(`DELETE FROM books WHERE id = ${req.params.id}`, (err,result) => {
        if(err) {
            res.send(err);
        }
        res.send(result);
    })
});