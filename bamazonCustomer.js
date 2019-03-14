var inquirer = require('inquirer');
var mysql = require('mysql');
require("dotenv").config();

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.MY_SQLPASS,
    database: 'bamazon',
});

function userPrompt() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'enter Item ID',
            validate: inputValidation,
            filter: Number,
        },
        {
            type: 'input',
            name: 'quantity',
            message: "enter amount needed",
            validate: inputValidation,
            filter: Number,
        }
    ]).then(function(input) {
        var item = input.item_id;
        var quantity = input.quantity;
        var queryItem = 'SELECT * FROM products WHERE ?';

        connection.query(queryItem, {item_id: item}, function (err, data) {
            if(err) {
                console.log(err)
            } if (data.length === 0) {
                console.log('Error: Please select valid Item ID');
                displayInv();
            } else {
                var productInfo = data[0];

                if (quantity <= productInfo.stock_quantity) {
                    console.log('This product is in stock. Placing your order');
                    var updateQuery = 'UPDATE products SET stock_quantity = ' + (productInfo.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                    connection.query(updateQuery, function(err, data){
                        if(err) {
                            console.log(err);
                        } console.log('Your order has been placed. Your total is $' + productInfo.price * quantity);
                        
                        connection.end();
                    })

                } else {
                    console.log('There are no products in stock');
                    displayInv();
                }
            }
        })
    })
}

//function to check for negative integers
function inputValidation (value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a positive integer.';
    }
}

//function to show data
function displayInv() {
    queryItem = 'SELECT * FROM products';

    connection.query(queryItem, function (err, data){
        if(err) {
            console.log(err);
        } console.log('Inventory: ');

        var string = '';
        for (var i = 0; i < data.length; i++) {
            string = '';
            string += 'Item ID: ' + data[i].item_id + ' ** ';
            string += 'Product: ' + data[i].product_name + ' ** ';
            string += 'Department: ' + data[i].department_name + ' ** ';
            string += 'Price $' + data[i].price;

            console.log(string);
        }
        userPrompt();
    })
}

function bamazonStart() {
    displayInv();
}

bamazonStart();