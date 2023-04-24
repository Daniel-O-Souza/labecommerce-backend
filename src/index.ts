import { users, products, purchases, createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";
import { CATEGORY, TProducts, TPurchases, TUsers } from "./types";
import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './database/knex'




console.log("O aplicativo foi iniciado")

// EXERCÍCIO 3 - TYPESCRIPT I ###############################################################################


createUser("u003", "João", "João@email.com", "452879", "2023-04-24 14:23:08")

getAllUsers()

createProduct("prod0003", "Calça", 50, "Calça jeans", "https://picsum.photos/200")

getAllProducts()

getProductById("prod0002")

console.table(queryProductsByName("televisão"))

createPurchase("pur0013", "u004", 2000, "2023-04-24 14:23:08", 0)

console.log(getAllPurchasesFromUserId("u002"))

// console.log(user, product, purchase)

// APPI E EXPRESS ###############################################################################

const app = express()


app.use(express.json())

app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

// BUSCANDO TODOS OS USUÁRIOS ###############################################################################

app.get("/users", async (req: Request, res: Response) => {

    try {
        const result = await db.raw(`SELECT * FROM users;`)
        res.status(200).send({ result })
    } catch (error: any) {
        res.status(400).send(error.message)
    }
})

// BUSCANDO TODOS OS PRODUTOS ###############################################################################

app.get("/products", async (req: Request, res: Response) => {

    try {
        const result = await db.raw(`SELECT * FROM products;`)
        res.status(200).send({ result })
    } catch (error: any) {
        res.status(400).send(error.message)
    }
})

// BUSCANDO PRODUTO PELO NOME ###############################################################################

app.get("/products/search", async (req: Request, res: Response) => {

    try {
        const q = req.query.q as string

        const [result]: {}[] = await db.raw(`SELECT * from products WHERE NAME LIKE '${q}';`)


        if (q.length < 1) {
            res.status(404)
            throw new Error("A busca deve conter ao menos um caractere.")
        }

        res.status(200).send(result)

    } catch (error: any) {
        res.status(400).send(error.message)
    }
})


// CRIANDO USUÁRIO ###############################################################################

app.post("/users", async (req: Request, res: Response) => {

    try {

        const id: string = req.body.id
        const name: string = req.body.name
        const email: string = req.body.email
        const password: string = req.body.password
        const createdAt: string = req.body.password


        if (typeof id !== "string") {
            res.status(400)
            throw new Error("Id deve ser do tipo string")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("Name deve ser do tipo string")
        }

        if (typeof email !== "string") {
            res.status(400)
            throw new Error("Email deve ser do tipo string")
        }

        if (typeof password !== "string") {
            res.status(400)
            throw new Error("Password deve ser do tipo string")
        }

        if (typeof createdAt !== "string") {
            res.status(400)
            throw new Error("createdAt deve ser do tipo string")
        }

        const [idExists]: {}[] = await db.raw(`SELECT * FROM users WHERE ID = '${id}';`)
        if (idExists) {
            throw new Error("Id de usuário Já existe no banco de dados")
        }

        const [emailExists]: {}[] = await db.raw(`SELECT * FROM users WHERE EMAIL = '${email}';`)
        if (emailExists) {
            throw new Error("Email Já existe no banco de dados")
        }

        const newUser: TUsers = await db.raw(`INSERT INTO users (id, name, email, password, createdAt) VALUES ('${id}', '${name}','${email}','${password}','${createdAt}');`)
        res.status(201).send("Cadastro realizado com sucesso")

    } catch (error: any) {
        res.status(400).send(error.message)
    }

})

// EDITAR USUÁRIO PELO ID ###############################################################################

app.put("/users/:id", (req: Request, res: Response) => {

    try {

        const id: string = req.params.id
        const newEmail: string | undefined = req.body.email
        const newPassword: string | undefined = req.body.password
        const user: TUsers = users.find((item) => item.id === id)

        if (!user) {
            res.status(400)
            throw new Error("O id do usuário digitado não existe, digite o id de um usuário cadastrado")
        }

        if (typeof newEmail !== "string") {
            res.status(400)
            throw new Error("O email deve ser do tipo string")
        }

        if (typeof newPassword !== "string") {
            res.status(400)
            throw new Error("O password deve ser do tipo string")
        }

        if (user) {
            user.email = newEmail || user.email
            user.password = newPassword || user.password
        }

        console.log("depois", user)

        res.status(201).send("Cadastro atualizado com sucesso")

    } catch (error) {
        res.send(error.message)
    }

})

// DELETAR USUÁRIO PELO ID ###############################################################################

app.delete("/users/:id", (req: Request, res: Response) => {

    try {

        const id: string = req.params.id

        const index: number = users.findIndex((item) => item.id === id)

        let message: string

        const deleteUser = users.find((user) => user.id === id)

        if (!deleteUser) {
            res.status(400)
            throw new Error("O id de usuário informado não existe, digite um id cadastrado")
        }

        if (index >= 0) {
            users.splice(index, 1)
            message = "Usuário apagado com sucesso"
        } else {
            message = "Nenhum usuário encontrado"
        }

        console.log(users)

        res.status(200).send(message)

    } catch (error) {
        res.send(error.message)
    }
})

// CRIANDO PRODUTO ###############################################################################

app.post("/products", async (req: Request, res: Response) => {

    try {
        const id: string = req.body.id
        const name: string = req.body.name
        const price: number = req.body.price
        const description: string = req.body.description
        const imageUrl: string = req.body.imageUrl
        // const category: CATEGORY = req.body.category



        if (typeof id !== "string") {
            res.status(400)
            throw new Error("Id do produto deve ser do tipo string")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("Nome do produto deve ser do tipo string")
        }

        if (typeof price !== "number") {
            res.status(400)
            throw new Error("Preço do produto deve ser do tipo number")
        }

        if (typeof description !== "string") {
            res.status(400)
            throw new Error("A descrição do produto deve ser do tipo string")
        }

        if (typeof imageUrl !== "string") {
            res.status(400)
            throw new Error("O link da imagem do produto deve ser do tipo string")
        }

        const [productIdExists]: {}[] = await db.raw(`SELECT * FROM products WHERE ID = '${id}';`)
        if (productIdExists) {
            throw new Error("Id do produto Já existe no banco de dados")
        }

        const newProduct: TProducts = await db.raw(`INSERT INTO products (id, name, price, description, imageUrl) VALUES ('${id}', '${name}','${price}','${description}','${imageUrl}');`)
        res.status(201).send("Cadastro realizado com sucesso")

    } catch (error: any) {
        res.status(400).send(error.message)
    }
})

// EDITAR PRODUTO PELO ID ###############################################################################

// app.put("/products/:id", (req: Request, res: Response) => {

//     try {
//         const id: string = req.params.id

//         const newName: string | undefined = req.body.name
//         const newPrice: number | undefined = req.body.price
//         const newCategory: CATEGORY | undefined = req.body.category

//         const product: TProducts = products.find((item) => item.id === id)

//         if (!product) {
//             res.status(400)
//             throw new Error("O id do produto digitado não existe, digite o id de um produto cadastrado")
//         }

//         if (typeof newName !== "string") {
//             res.status(400)
//             throw new Error("O nome do produto deve ser do tipo string")
//         }

//         if (typeof newPrice !== "number") {
//             res.status(400)
//             throw new Error("O preço do produto deve ser do tipo number")
//         }

//         if (typeof newCategory !== "string") {
//             res.status(400)
//             throw new Error("A categoria do do produto deve ser do tipo string")
//         }

//         if (product) {
//             product.name = newName || product.name
//             product.price = isNaN(newPrice) ? product.price : newPrice
//             product.category = newCategory || product.category
//         }

//         console.log("depois", product)

//         res.status(201).send("Produto atualizado com sucesso")
//     } catch (error) {
//         res.send(error.message)
//     }

// })

// DELETAR PRODUTO POR ID ###############################################################################

app.delete("/products/:id", (req: Request, res: Response) => {

    try {
        const id: string = req.params.id

        const index: number = products.findIndex((item) => item.id === id)

        let message: string

        const product = products.find((product) => product.id === id)

        if (!product) {
            res.status(400)
            throw new Error("O id do produto informado não existe, digite um id cadastrado")
        }

        if (index >= 0) {
            products.splice(index, 1)
            message = "Produto deletado com sucesso"
        } else {
            message = "Nenhum produto encontrado"
        }

        console.log(products)

        res.status(200).send(message)

    } catch (error) {
        res.send(error.message)
    }
})


// BUSCANDO PRODUTO POR ID ###############################################################################

app.get("/products/:id", async (req: Request, res: Response) => {

    try {

        const id: string = req.params.id

        const result: TProducts = await db.raw(`SELECT * from products WHERE ID = '${id}';`)

        if (!result) {
            res.status(400)
            throw new Error("O id do produto buscado não existe, digite um id existente.")
        }

        res.status(200).send(result)

    } catch (error: any) {
        res.status(400).send(error.message)
    }
})

// CRIANDO COMPRA ###############################################################################

app.post("/purchases", async (req: Request, res: Response) => {

    try {

        const id: string = req.body.id
        const buyer: string = req.body.buyer
        const totalPrice: number = req.body.totalPrice
        const createdAt: string = req.body.createdAt
        const paid: number = req.body.paid


        if (typeof id !== "string") {
            res.status(400)
            throw new Error("Id da compra deve ser do tipo string")
        }

        if (typeof buyer !== "string") {
            res.status(400)
            throw new Error("Id do comprador deve ser do tipo string")
        }

        if (typeof totalPrice !== "number") {
            res.status(400)
            throw new Error("O preço total da compra deve ser do tipo number")
        }

        if (typeof paid !== "number") {
            res.status(400)
            throw new Error("O pagamento da compra  deve ser do tipo number")
        }

        if (typeof createdAt !== "string") {
            res.status(400)
            throw new Error("A data de criação da compra deve ser do tipo string")
        }

        const buyerExists: TUsers = await db.raw(`SELECT * FROM purchases WHERE BUYER = '${buyer}';`)
        if (!buyerExists) {
            throw new Error("Id de usuário não existe no banco de dados")
        }


        const newPurchase: TPurchases = await db.raw(`INSERT INTO purchases (id, buyer, totalPrice, paid, created_at) VALUES ('${id}', '${buyer}','${totalPrice}','${paid}','${createdAt}');`)
        res.status(201).send("Cadastro realizado com sucesso")

    } catch (error: any) {
        res.status(400).send(error.message)
    }

})

// BUSCAR COMPRAS PELO ID DO USUÁRIO ###############################################################################

app.get("/users/:id/purchases", async (req: Request, res: Response) => {

    try {
        const id: string = req.params.id

        const result: TPurchases = await db.raw(`SELECT * from purchases WHERE BUYER = '${id}';`)

        if (!result) {
            res.status(400)
            throw new Error("O id do usuário não existe, informe o id de um usúario cadastrado.")
        }

        res.status(200).send(result)

    } catch (error) {
        res.status(400).send(error.message)
    }
})