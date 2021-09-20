const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'testprofiledatabase'
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Server is active');
});

app.post('/api/insert', (req, res) => {
    const schedule = req.body;
    const {pickupDate, pickupTime, requestPickup, requestDropOff, comments} = schedule;

    const sqlInsertSchedule = "INSERT INTO schedule (pickupDate, pickupTime, requestPickup, requestDropOff, comments) VALUES (?,?,?,?,?)"
    db.query(sqlInsertSchedule, [pickupDate, pickupTime, requestPickup, requestDropOff, comments], (err, result) =>{
        console.log(err);
    })
})

app.listen(3001, () => {
    console.log('Running on port 3001');
});