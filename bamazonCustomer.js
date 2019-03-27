const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "W84dinner!",
  database: "bamazon"
});

// connection.connect(function(err) {
//   if (err) throw err;
//   customerPrompt();
// });


function showProducts(){
  connection.query('SELECT * FROM products', function(err, result) {
    if (err) throw err;
    var products = result

    console.log('-----------------')
    for (i=0; i< result.length; i++) {
      console.log(`ID:${result[i].item_id} - Product Name:${result[i].product_name} -  Dept Name:${result[i].department_name} - Price: $${result[i].price} - Stock: ${result[i].stock_quantity}`)
    } 
    console.log('-----------------')

    customerPrompt();
  })

}



function checkProduct(itemId){
  let quantity = 0;

  function setValue(value){
    quantity = value;
    console.log(quantity);
  }

  let query = "SELECT stock_quantity FROM products WHERE item_id = ?"
  connection.query(query, [itemId], function(err, result){
    if (err) throw err;
    setValue(result[0].stock_quantity)
  
  })

  return quantity;
}


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

    
    // console.log(checkProduct(answer.itemId));
    

    // if (checkProduct(answer.itemId) < answer.buyQuantity){
    //   console.log("Not enough product. Sorry!");
    //   customerPrompt();
    // } 
    // else {
    //   buyProduct(answer.itemId, answer.buyQuantity);
    //   customerReceipt(answer.itemId, answer.buyQuantity);
    }
    ;
  })

}

function buyProduct(itemId, itemQuantity){
  connection.query("UPDATE products SET ? WHERE ?",[
    {
      stock_quantity: stock_quantity - itemQuantity
    },
    {
      item_id: itemId
    }
  ], function(err){
    if (err) throw err;
    console.log("Bamazon DB updated")
  })
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

showProducts();



