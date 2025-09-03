//1. - It is incredibly easy to follow the CRUD paradignm with just a few function calls in MongoDB
//   - MondoDB is very lightweight data abse with not a lot of setup to hook into Node.js
//   - Cost-effective
//   - Change-friendly design

const { MongoClient } = require('mongodb');

var MondoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:3000/testDB";

//2. Write code to create a collection called "customers"

MongoClient.connect(url, function(err, db) {
    if (err) {
        throw err;
    }
    db.createCollection("cutomers", function(err, res) {
        if (err) {
            throw err;
        }
        console.log("customers Collection created!");
        db.close();
    });
});

//3. Define a variable called "inputCustomers" with the following data

var inputCustomers = [
    {'name': 'Nate', 'address': '123 Main Street'}, 
    {'name': 'James', 'address': '1834 South Charles'},
    {'name': 'Tupac', 'address': '222 Thugs Mansion Drive'},
    {'name': 'Fred', 'address': '5 Cavan Green Circle'},
    {'name': 'Cassie', 'address': '56 Riverside Avenue'},
];

//4. Write code to input “inputCustomers” into the “customer” collection

MongoClient.connect(url, function(err, db) {
    db.collection("customers").insertMany(inputCustomers, function(err, res) {
        if (err) {
            throw err;
        }
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    });
});

//5. Write code to return the customer names in ascending order from the “customer” collection

MongoClient.connect(url, function(err, db) {
    if (err) {
        throw err;
    }
    var nameSort = { 'name': 1 };
    db.collection("customers").find().sort(nameSort).toArray(function(err, result) {
        if (err) {
            throw err;
        }
        console.log(result);
        db.close();
    });
});

//6. Write code to update Cassie’s address from “56 Riverside Avenue” to “1244 William Street”

MongoClient.connect(url, function(err, db) {
    if (err) {
        throw err;
    }
    var keyQuery = {'address': '56 Riverside Avenue'};
    var newValue = {'address': '1244 William Street'};
    db.collection("customers").updateOne(keyQuery, newValue, function(err, res) {
        if (err) {
            throw err;
        }
        console.log("Cassie's address updated!")
        db.close();
    });
});

//7. Write out the code to delete the customer collection

MongoClient.connect(url, function(err, db) {
    if (err) {
        throw err;
    }
    db.collection("customers").drop(function(err, delOK) {
        if (err) {
            throw err;
        }
        if (delOK) {
            console.log("Collection deleted");
        }
        db.close();
    });
});



