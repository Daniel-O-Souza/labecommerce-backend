-- Active: 1682273795400@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL    
);

INSERT INTO users (id, email, password)
VALUES
("u001", "daniel@email.com", "568741"),
("u002", "marias@email.com", "458763"),
("u003", "joao@email.com", "457236");

SELECT * FROM users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)
VALUES
("prod0001", "Geladeira", 2000, "Eletrônicos"),
("prod0002", "Pulseira", 50, "Acessórios"),
("prod0003", "Camiseta", 60, "Roupas e calçados"),
("prod0004", "playstation 5", 3500, "Eletrônicos"),
("prod0005", "Sapato", 150, "Roupas e calçados");

SELECT * FROM products;

