var mysql       = require('mysql');
var inquirer    = require('inqurier');
var connection  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'Bamazon'
});

// is there something wrong with these comments?//
connection.connect(function(err){
    if(err){
        console.error('error connectiong: ' + err.stack)
    }
    makeTable()
});

var makeTable = function(){
    connection.query('SELELECT * FROM products', function(err, res){
        if(err) throw err;

        var tab = '\t';
        console.log("ItemID\tProduct Name\tDepartment Name\tPrice\t# In Stock");
        console.log("--------------------------------------------------------");
    })
}
