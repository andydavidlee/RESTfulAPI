const express = require('express')
const router = express.Router();
const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node_usersAPI',
    port: 8889
});

function getConnection(){
    return pool;
};

    router.get("/users", (req, res, next) => {
    
        const connection = getConnection();
    
        const queryString = "SELECT * FROM users";
        connection.query(queryString, (err, rows, fields) => {
            if(err){
                res.send(`Something is wrong ${err}`);
                next(new Error(`Something is wrong ${err}`));
            }
        res.json(rows);
        }); 
    });
    
    router.get('/users/:id', (req, res, next) => {
    
        const connection = getConnection();
    
        const userID = req.params.id;
        console.log(userID);
        const queryString = "SELECT * FROM users WHERE id=?";
        connection.query(queryString, [userID], (err, rows, fields) =>{
            if(err){
                res.send(`Something is wrong ${err}`);
                next(new Error(`Something is wrong ${err}`));
            }
            const users = rows.map((fields) => {
                return {firstName: fields.first_name, lastName: fields.last_name};
            })
            res.json(users);
        });
    });
    
    router.post('/user_create', (req, res, next) => {
    
        const connection = getConnection();
        const queryString = "INSERT INTO users (first_Name, last_Name) VALUES (?,?)"
        console.log(req.body);
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
    
        connection.query(queryString, [firstName, lastName], (err, results, fields) =>{
            if(err) {
                res.send(`Failed to insert new user: ${err}`);
                res.sendStatus(500);
                next(new Error(`Failed to insert new user: ${err}`));
            }
            
            res.send(`Inserted a new user with id: ${results.insertID}`);
        });
    });

    module.exports = router;