const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDB', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to Mongo');
    }).catch(err => {
        console.log(`error on connecting to mongo: ${err}`);
    })

require('./employee.model');