-- Active: 1682273795400@@127.0.0.1@3306

-- CRIANDO TABELA USERS 

CREATE TABLE users (
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL    
);

--POVOANDO TABELA USERS 

INSERT INTO users (id, email, password)
VALUES
("u001", "daniel@email.com", "568741"),
("u002", "marias@email.com", "458763"),
("u003", "joao@email.com", "457236");

--CRIANDO TABELA PRODUCTS 

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

-- POVOANDO TABELA PRODUCTS 

INSERT INTO products (id, name, price, category)
VALUES
("prod0001", "Geladeira", 2000, "Eletrônicos"),
("prod0002", "Pulseira", 50, "Acessórios"),
("prod0003", "Camiseta", 60, "Roupas e calçados"),
("prod0004", "playstation 5", 3500, "Eletrônicos"),
("prod0005", "Sapato", 150, "Roupas e calçados");

-- RETORNAR TODOS OS USUÁRIOS CADASTRADOS 

SELECT * FROM users;

-- RETORNAR TODOS OS PRODUTOS CADASTRADOS 

SELECT * FROM products;

-- BUSCAR PRODUTO PELO NOME 

SELECT * from products WHERE name = "Geladeira";

-- CRIAR NOVO USUÁRIO 

INSERT INTO users (id, email, password)
VALUES
("u004", "ana@email.com", "652398");

-- CRIAR NOVO PRODUTO 

INSERT INTO products (id, name, price, category)
VALUES
("prod0006", "Óculos de sol", 500, "Acessórios");

-- BUSCAR PRODUTO PELO ID 

SELECT * from products WHERE id = "prod0001";

-- DELETAR USUÁRIO PELO ID 

DELETE FROM users
WHERE id = "u001";

-- DELETAR PRODUTO PELO ID 

DELETE FROM products
WHERE id = "prod0001";

-- EDITAR USUÁRIO PELO ID

UPDATE users
SET
email = "jose@email.com",
password = "698547"
WHERE id = "u002";

-- EDITAR PRODUTO PELO ID

UPDATE products
SET
name = "Colar",
price = 600,
category = "Acessórios"
WHERE id = "prod0002";

-- RETORNAR TODOS OS USUÁRIOS ORDENADOS PELA COLUNA EMAIL EM ORDEM CRESCENTE

SELECT * FROM users
ORDER BY email ASC;

-- RETORNAR TODOS OS PRODUTOS ORDENADOS PELA COLUNA PRICE EM ORDEM CRESCENTE INICIANDO PELO PRIMEIRO ITEM E LIMITANDO A 20 ITENS

SELECT * FROM products
ORDER BY price ASC
LIMIT 20;

-- RETORNAR TODOS OS PRODUTOS DENTRO DE UM INTERVALO DE PREÇO DETERMINADO EM ORDEM CRESCENTE

SELECT * from products 
WHERE price >= 100 AND price <= 500
ORDER BY price ASC;