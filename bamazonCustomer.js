const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "W84dinner!",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  customerPrompt();
});

function customerPrompt(){

  inquirer.prompt([
    //The first should ask them the ID of the product they would like to buy.
    {
      name: "itemId",
      type: "input",
      message: "What is the Item Id of the product you would like to purchase?"
    },
    //The second message should ask how many units of the product they would like to buy.
    {
      name: "buyQuantity",
      type: "input",
      message: "How many units would you like to purchase?"
    }
  ])
  .then(function(answer){
    if (checkProduct(answer.itemId) < answer.buyQuantity){
      console.log("Not enough product. Sorry!");
      customerPrompt();
    } 
    else {
      buyProduct();
      customerReceipt();
    }
    ;
  })

}

function checkProduct(itemId){
  connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [itemId], function(err, result){
    if (err) throw err;
    let quantity = result[0].stock_quantity;
    console.log(quantity);
    return quantity;
  })
}

function buyProduct(id, itemQuantity){

  connection.query()
}

function customerReceipt(itemId, quantity){
  connection.query("SELECT * FROM products WHERE item_id = ?", [itemId], function(err, result){
    if (err) throw err;
    let price = result[0].price * quantity;
    let itemName = result[0].product_name;
    console.log(`Item Name: ${itemName}`);
    console.log(`Quantity Purchased: ${quantity}`);
    console.log(`Total Purchase Price: ${price}`);

  })
}







