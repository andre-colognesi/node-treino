const express = require('express');
const path = require('path');
const app = express();
const members = require('./Members.js');
/*const members = [{
        "balance": "$3,946.45",
        "id": 1,
        "picture": "http://placehold.it/32x32",
        "age": 23,
        "name": "Bird Ramsey",
        "gender": "male",
        "company": "NIMON",
        "email": "birdramsey@nimon.com"
    },
    {
        "balance": "$2,499.49",
        "id": 2,
        "picture": "http://placehold.it/32x32",
        "age": 31,
        "name": "Lillian Burgess",
        "gender": "female",
        "company": "LUXURIA",
        "email": "lillianburgess@luxuria.com"
    },
    {
        "balance": "$2,820.18",
        "id": 3,
        "picture": "http://placehold.it/32x32",
        "age": 34,
        "name": "Kristie Cole",
        "gender": "female",
        "company": "QUADEEBO",
        "email": "kristiecole@quadeebo.com"
    },
    {
        "balance": "$3,277.32",
        "id": 4,
        "picture": "http://placehold.it/32x32",
        "age": 30,
        "name": "Leonor Cross",
        "gender": "female",
        "company": "GRONK",
        "email": "leonorcross@gronk.com"
    },
    {
        "balance": "$1,972.47",
        "id": 5,
        "picture": "http://placehold.it/32x32",
        "age": 28,
        "name": "Marsh Mccall",
        "gender": "male",
        "company": "ULTRIMAX",
        "email": "marshmccall@ultrimax.com"
    }
]; */
const logger = (req, res, next) => {
    console.log('teste');
    next();
}

app.use(logger);

//app.get('/api/membros', (req, res) => res.json(members[1].id))
app.get('/api/membros', (req, res) => {
    for (let i = 0; i < members.length; i++) {
        res.write(members[i].name + '/n');
    }
    res.send();
})

app.get('/api/membro/:id', (req, res) => {

    res.json(members.filter(member => member.id === parseInt(req.params.id)))
})


//pasta static
app.use(express.static(path.join(__dirname, 'public')));

//app.get('/', (req, res) => {
//    res.sendFile(path.join(__dirname, 'public', 'index.html'))
//})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server on port ${PORT}`));