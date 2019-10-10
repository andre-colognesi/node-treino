const express = require('express');
const client = require('./config/twitter');
const router = require('./routes/api/twitterRoutes');
//const public = require('./public/');
const app = express();
const path = require('path');
const fs = require('fs');

//Aplicação escutando requisições do método GET "/"
app.use('/api/', router);

app.get('/', (req, res) => {
    fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, html) {
        res.send(html)
    })

});


app.listen(5656, () => {
    console.log('server running on port 5656');
})