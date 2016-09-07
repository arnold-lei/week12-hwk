var mysql       = require('mysql');
var inquirer    = require('inquirer');
var term        = require( 'terminal-kit' ).terminal ;
var history     = []
var connection  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'Bamazon'
});

var autoComplete = []

// is there something wrong with these comments?//
connection.connect(function(err){
    if(err){
        console.error('error connectiong: ' + err.stack)
    }
    makeTable()
});

var makeTable = function(){
    connection.query('SELECT * FROM products', function(err, res){
        if(err) throw err;
        term.clear();
        var tab = '\t';
        console.log("ItemID\tProduct Name\t\tDepartment\tPrice\t# In Stock");
        console.log("--------------------------------------------------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            autoComplete.push(res[i].ProductName);
            history.push(res[i].ProductName);
            term(res[i].ItemID + tab + res[i].ProductName + tab + res[i].DepartmentName + tab + res[i].Price + tab + res[i].StockQuantity + '\n');
        }
        promptCustomer(res);
    })
}
//FUNCTION CONTAINING ALL CUSTOMER PROMPTS//
var promptCustomer = function(res) {
        //PROMPTS USER FOR WHAT THEY WOULD LIKE TO PURCHASE//
        term('\nHit tab to autocomplete\n')
        term('What would you like to purchase?: ');
        term.inputField({
            history: history,
            autoComplete: autoComplete,
            autoCompleteMenu: true
        }, function(error, input){
            term.green('\nYou selected:\n', input);
            term.red(input)
            term.yellow('Do you want to purchase this item? [Y/N]\n');
            term.yesOrNo({
                yes: ['Y', 'ENTER', 'y'],
                no: ['N', 'n']
            }, function(error, result){
                if(result){

                    term.yellow('Purchasing this item.')
                    process.exit()
                } else {
                    term.red('You do not want to purchase this item.')
                    promptCustomer(res)
                }
            })
            // process.exit()
        })
        // inquirer.prompt([{
        //     type: 'input',
        //     name: 'choice',
        //     message: 'What would you like to purchase?'
        // }]).then(function(val){
        //     console.log('some value')
        // }).then(function(val){
        //     var correct = false;
        //     console.log(val)
        //     for (var i=0; i<res.length; i++){
        //     }
        // })
        // .then(function(val) {​
        //         //SET THE VAR correct TO FALSE SO AS TO MAKE SURE THE USER INPUTS A VALID PRODUCT NAME//
        //         var correct = false;
        //         //LOOPS THROUGH THE MYSQL TABLE TO CHECK THAT THE PRODUCT THEY WANTED EXISTS//
        //         for (var i = 0; i < res.length; i++) {
	    //             //1. todo: IF THE PRODUCT EXISTS, SET correct = true and ASK THE USER TO SEE HOW MANY OF THE PRODUCT THEY WOULD LIKE TO BUY//
	    //            	//2. todo: CHECK TO SEE IF THE AMOUNT REQUESTED IS LESS THAN THE AMOUNT THAT IS AVAILABLE//
	    //             //3. todo: UPDATE THE MYSQL TO REDUCE THE StockQuanaity by the THE AMOUNT REQUESTED  - UPDATE COMMAND!
	    //             //4. todo: SHOW THE TABLE again by calling the function that makes the table
        //         }
        //
        //         //IF THE PRODUCT REQUESTED DOES NOT EXIST, RESTARTS PROMPT//
        //         if (i == res.length && correct == false) {
        //             promptCustomer(res);
        //         }
        //     });
}
