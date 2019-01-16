CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products
(
  item_id int AUTO_INCREMENT,
  product_name varchar (150) NOT NULL,
  department_name varchar(150) NOT NULL,
  price int NOT NULL,
  stock_quantity int NOT NULL,
  PRIMARY KEY (item_id)
);

  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("Vizio 42-Inch Television", "Electronics", 400, 123)
    , ("iPod nano", "Electronics", 200, 4239)
    , ("Gibson Les Paul Guitar", "Music Intruments", 2000, 13)
    , ("Playstation 8", "Video Games", 800, 1221)
    , ("Zack", "Human", 100, 1)
	  , ("Tickle Me Elmo", "Toys", 60, 345)
    , ("Xbox One Two", "Video Games", 800, 1001)
    , ("Banana", "Fruit", 1, 12093)
    , ("Ray Gun", "Electronics", 100000, 3)
    , ("The Shining", "Books", 10, 638)
;
select * from products