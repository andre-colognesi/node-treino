const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Inserir Empregado"
    });
})

router.post('/', (req, res) => {
    //if (req.body._id == "") {
    insertRecord(req, res);
    //} else {
    //    console.log(req)
    //    updateRecord(req, res);
    //}
})

function insertRecord(req, res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        } else {
            console.log(`Error ${err}`);
        }
    })
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        } else {
            console.log(`Error: ${err}`);
        }
    })
}


router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
                list: docs
            })
        }
    })

})

router.get("/:id", (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('employee/addOrEdit', {
                viewTitle: "Editar Empregado",
                employee: doc
            });
        } else {
            console.log(err);
        }
    })
})

router.post("/:id", (req, res) => {
    updateRecord(req, res);
})

router.get("/:id/delete", (req, res) => {
    deleteRecord(req, res);
})

function deleteRecord(req, res) {
    Employee.findByIdAndRemove({ _id: req.params.id }, (err) => {
        if (!err) {
            res.redirect('/employee/list');
        } else {
            console.log(`Error: ${err}`);
        }
    })
}

module.exports = router;