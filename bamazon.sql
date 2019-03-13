CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(20) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Kobe 81 Shirt', 'Clothing', 21.50, 15),
        ('Checkered Flannel', 'Clothing', 15.50, 20),
        ('Nike Roshe', 'Shoes', 79.99, 99),
        ('Converse All Stars', 'Shoes', 49.99, 99),
        ('GoPRO', 'Electronics', 99.99, 99),
        ('MacBook Pro 2019', 'Electronics', 1599.99, 99),
        ('Dell XPS 2019', 'Electronics', 1399.99, 99),
        ('Elder Scrolls: Skyrim', 'Games', 59.99, 99),
        ('Zelda: Breath of The Wild', 'Game', 59.99, 99),
        ('Pokemon Soul Silver', 'Game', 39.99, 99);