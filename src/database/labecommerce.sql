-- Active: 1682273795400@@127.0.0.1@3306

-- CRIANDO TABELA USERS

CREATE TABLE
    users (
        id TEXT PRIMARY KEY NOT NULL UNIQUE,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

--POVOANDO TABELA USERS

INSERT INTO
    users (id, email, password)
VALUES (
        "u001",
        "daniel@email.com",
        "568741"
    ), (
        "u002",
        "marias@email.com",
        "458763"
    ), (
        "u003",
        "joao@email.com",
        "457236"
    );

--CRIANDO TABELA PRODUCTS

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

-- POVOANDO TABELA PRODUCTS

INSERT INTO
    products (id, name, price, category)
VALUES (
        "prod0001",
        "Geladeira",
        2000,
        "Eletrônicos"
    ), (
        "prod0002",
        "Pulseira",
        50,
        "Acessórios"
    ), (
        "prod0003",
        "Camiseta",
        60,
        "Roupas e calçados"
    ), (
        "prod0004",
        "playstation 5",
        3500,
        "Eletrônicos"
    ), (
        "prod0005",
        "Sapato",
        150,
        "Roupas e calçados"
    );

-- RETORNAR TODOS OS USUÁRIOS CADASTRADOS

SELECT * FROM users;

-- RETORNAR TODOS OS PRODUTOS CADASTRADOS

SELECT * FROM products;

-- BUSCAR PRODUTO PELO NOME

SELECT * from products WHERE name = "Geladeira";

-- CRIAR NOVO USUÁRIO

INSERT INTO
    users (id, email, password)
VALUES (
        "u004",
        "ana@email.com",
        "652398"
    );

-- CRIAR NOVO PRODUTO

INSERT INTO
    products (id, name, price, category)
VALUES (
        "prod0006",
        "Óculos de sol",
        500,
        "Acessórios"
    );

-- BUSCAR PRODUTO PELO ID

SELECT * from products WHERE id = "prod0001";

-- DELETAR USUÁRIO PELO ID

DELETE FROM users WHERE id = "u001";

-- DELETAR PRODUTO PELO ID

DELETE FROM products WHERE id = "prod0001";

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

SELECT * FROM users ORDER BY email ASC;

-- RETORNAR TODOS OS PRODUTOS ORDENADOS PELA COLUNA PRICE EM ORDEM CRESCENTE INICIANDO PELO PRIMEIRO ITEM E LIMITANDO A 20 ITENS

SELECT * FROM products ORDER BY price ASC LIMIT 20;

-- RETORNAR TODOS OS PRODUTOS DENTRO DE UM INTERVALO DE PREÇO DETERMINADO EM ORDEM CRESCENTE

SELECT *
from products
WHERE price >= 100 AND price <= 500
ORDER BY price ASC;

-- CRIANDO TABELA DE COMPRAS

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        total_price REAL NOT NULL,
        paid INTEGER NOT NULL,
        delivered_at TEXT,
        buyer_id TEXT NOT NULL,
        FOREIGN KEY(buyer_id) REFERENCES users(id)
    );

-- POPULANDO TABELA DE PEDIDOS

INSERT INTO
    purchases (
        id,
        total_price,
        paid,
        delivered_at,
        buyer_id
    )
VALUES ("pur0001", 6000, 0, NULL, "u002"), ("pur0002", 300, 1, NULL, "u002"), ("pur0003", 400, 0, NULL, "u003"), ("pur0004", 3000, 1, NULL, "u003");

-- EDITANDO STATUS DA DATA DE ENTREGA DOS PEDIDOS

UPDATE purchases
SET
    delivered_at = CURRENT_TIMESTAMP
WHERE id = "pur0001";

UPDATE purchases
SET
    delivered_at = CURRENT_TIMESTAMP
WHERE id = "pur0002";

UPDATE purchases
SET
    delivered_at = CURRENT_TIMESTAMP
WHERE id = "pur0003";

UPDATE purchases
SET
    delivered_at = CURRENT_TIMESTAMP
WHERE id = "pur0004";

-- SIMULANDO HISTÓRICO DE COMPRAS DE DETERMINADO USUÁRIO

SELECT * from purchases WHERE buyer_id = "u002";

-- CRIANDO TABELA DE RELAÇÕES

CREATE TABLE
    purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY(purchase_id) REFERENCES purchases(id),
        FOREIGN KEY(product_id) REFERENCES products(id)
    );

-- POVOANDO TABELA DE RELAÇÕES

INSERT INTO
    purchases_products (
        purchase_id,
        product_id,
        quantity
    )
VALUES ("pur0001", "prod0002", 2), ("pur0002", "prod0004", 3), ("pur0003", "prod0003", 1), ("pur0004", "prod0005", 3);

-- JUNÇÃO DAS TABELAS RELACIONADAS

SELECT *
FROM purchases_products
    INNER JOIN purchases ON purchases_products.purchase_id = purchases.id
    INNER JOIN products ON purchases_products.product_id = products.id;