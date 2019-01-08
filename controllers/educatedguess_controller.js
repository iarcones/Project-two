var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var db = require("../models");



router.get("/", function (req, res) {

    // var topTen = require("topTen");
    var x=module.exports.placeHolder;
    console.log(x);

    /////
    res.render("index");
    // var hbsObject = {
    //     movies: topTen
    // };
    
    // console.log("hbsObject", hbsObject);
    // res.render("index", hbsObject);

    ////
    // var customerName = req.cookies.customername;
    // var customerId = req.cookies.customerid;

    // db.Media.findAll({
    //     order: [['omdb_rating', 'DESC']],
    //     limit: 10 
    // }).then(function (data) {
    //     var hbsObject = {
    //         burgers: data
    //     };
    //     res.render("index", hbsObject);

    // db.Customerburger.findAll({
    //     include: [{ association: 'Burger' }
    //     ],
    //     where: {
    //         CustomerId: customerId,
    //     },
    //     order: [
    //         ['counter', 'DESC']
    //     ],
    // }).then(function (dbBurgerCustomer) {
    //     hbsObject.burgerscustomer = dbBurgerCustomer;
    //     res.render("index", hbsObject);
    // });

});


router.post("/api/burgers", function (req, res) {
    db.Burger.create({
        burger_name: req.body.name,
    })
        .then(function (dbBurger) {
            res.json(dbBurger);
        });
});

router.put("/api/devoured/:id/:customerId", function (req, res) {
    burger = req.params.id;
    client = req.params.customerId;

    db.Burger.increment('burger_counter', { where: { id: req.params.id } }).then(function (data) {
        console.log("client: ", client)
        if (client !== 'null') {
            console.log("client in the if: ", client)
            db.Customerburger.increment('counter', { where: { BurgerId: burger, CustomerId: client } }).then(function (data) {

                /// if rec doesn't exist create and counter = 1;
                if (data[0][1] === (0)) {
                    db.Customerburger.create(
                        {
                            BurgerId: burger,
                            CustomerId: client
                        })
                        .then(function (dbcustomerburger) {
                            res.json(dbcustomerburger);
                        });
                }
                else {
                    res.json(data);
                }
            });
        }
        else {
            res.json(data);
        }
    });

});

router.post("/api/customers", function (req, res) {

    db.Customer.create({
        customer_name: req.body.name,
    }).then(function (dbCustomer) {

        res.json(dbCustomer);
    });
});


module.exports = router;