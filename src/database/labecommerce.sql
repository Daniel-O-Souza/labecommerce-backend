-- Active: 1682278723466@@127.0.0.1@3306

-- CRIANDO TABELA USERS

-- CREATE TABLE

--     users (

--         id TEXT PRIMARY KEY NOT NULL UNIQUE,

--         email TEXT UNIQUE NOT NULL,

--         password TEXT NOT NULL

--     );

-- DROP TABLE users;

CREATE TABLE
    users (
        id TEXT PRIMARY KEY NOT NULL UNIQUE,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        createdAt TEXT
    );

--POVOANDO TABELA USERS

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        createdAt
    )
VALUES (
        "u001",
        "Daniel",
        "daniel@email.com",
        "568741",
        CURRENT_TIMESTAMP
    ), (
        "u002",
        "Maria",
        "maria@email.com",
        "458763",
        CURRENT_TIMESTAMP
    ), (
        "u004",
        "Lucas",
        "lucas@email.com",
        "241578",
        CURRENT_TIMESTAMP
    ), (
        "u005",
        "Beatriz",
        "beatriz@email.com",
        "695214",
        CURRENT_TIMESTAMP
    ), (
        "u006",
        "Marcos",
        "marcos@email.com",
        "987456",
        CURRENT_TIMESTAMP
    ), (
        "u007",
        "Ana",
        "ana@email.com",
        "695712",
        CURRENT_TIMESTAMP
    ), (
        "u008",
        "Marcia",
        "marcia@email.com",
        "367459",
        CURRENT_TIMESTAMP
    );

--CRIANDO TABELA PRODUCTS

-- CREATE TABLE

--     products (

--         id TEXT PRIMARY KEY UNIQUE NOT NULL,

--         name TEXT NOT NULL,

--         price REAL NOT NULL,

--         category TEXT NOT NULL

--     );

-- DROP TABLE products;

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        imageUrl TEXT NOT NULL
    );

-- POVOANDO TABELA PRODUCTS

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        imageUrl
    )
VALUES (
        "prod0001",
        "Geladeira",
        2000,
        "Geladeira duplex Electrolux",
        "https://picsum.photos/200"
    ), (
        "prod0002",
        "Pulseira",
        300,
        "Pulseira de prata",
        "https://picsum.photos/200"
    ), (
        "prod0003",
        "Camiseta",
        100,
        "Camiseta da banda Iron Maiden",
        "https://picsum.photos/200"
    ), (
        "prod0004",
        "playstation 5",
        400,
        "Console para jogos modernos",
        "https://picsum.photos/200"
    ), (
        "prod0005",
        "Televisão",
        2500,
        "Tv 50 com tela de polegadas marca TCL",
        "https://picsum.photos/200"
    ), (
        "prod0006",
        "Óculos de sol",
        500,
        "Óculos de sol da marca Ray Ban",
        "https://picsum.photos/200"
    ), (
        "prod0007",
        "Tênis",
        800,
        "Tênis da marca nike",
        "https://picsum.photos/200"
    ), (
        "prod0008",
        "Calça",
        80,
        "Calça de moletom",
        "https://picsum.photos/200"
    ), (
        "prod0009",
        "Bicicleta",
        1500,
        "Bicicleta da marca GTSM1",
        "https://picsum.photos/200"
    ), (
        "prod00010",
        "Colar",
        3500,
        "Colar de ouro e diamantes",
        "https://picsum.photos/200"
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

-- CREATE TABLE

--     purchases (
--         id TEXT PRIMARY KEY UNIQUE NOT NULL,
--         total_price REAL NOT NULL,
--         paid INTEGER NOT NULL,
--         delivered_at TEXT,
--         buyer_id TEXT NOT NULL,
--         FOREIGN KEY(buyer_id) REFERENCES users(id)
--     );

-- DROP TABLE purchases;

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,
        totalPrice REAL NOT NULL,
        paid INTEGER NOT NULL,
        created_at TEXT,
        FOREIGN KEY(buyer) REFERENCES users(id)
    );

-- POPULANDO TABELA DE PEDIDOS

INSERT INTO
    purchases (
        id,
        buyer,
        totalPrice,
        paid,
        created_at
    )
VALUES (
        "pur0001",
        "u001",
        3000,
        0,
        CURRENT_TIMESTAMP
    ), (
        "pur0002",
        "u001",
        400,
        0,
        CURRENT_TIMESTAMP
    ), (
        "pur0003",
        "u003",
        600,
        0,
        CURRENT_TIMESTAMP
    ), (
        "pur0004",
        "u005",
        800,
        0,
        CURRENT_TIMESTAMP
    ), (
        "pur0005",
        "u004",
        5000,
        0,
        CURRENT_TIMESTAMP
    ), (
        "pur0006",
        "u004",
        3500,
        0,
        CURRENT_TIMESTAMP
    ), (
        "pur0007",
        "u002",
        600,
        0,
        CURRENT_TIMESTAMP
    ), (
        "pur0008",
        "u007",
        7500,
        0,
        CURRENT_TIMESTAMP
    ), (
        "pur0009",
        "u006",
        2500,
        0,
        CURRENT_TIMESTAMP
    ), (
        "pur0010",
        "u002",
        5000,
        0,
        CURRENT_TIMESTAMP
    );

SELECT * FROM purchases;
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