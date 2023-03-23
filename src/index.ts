import { users, products, purchases, createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";
import { CATEGORY, TProducts, TPurchases, TUsers } from "./types";
import express, { Request, Response } from 'express'
import cors from 'cors'



console.log("O aplicativo foi iniciado")

// EXERCÍCIO 3 - TYPESCRIPT I


createUser("João", "João@email.com", "452879")

getAllUsers()

createProduct("0303", "Calça", 50, CATEGORY.CLOTHES_AND_SHOES)

getAllProducts()

getProductById("0202")

console.table(queryProductsByName("televisão"))

createPurchase("Daniel", "0202", 2, 5000)

console.log(getAllPurchasesFromUserId("Jhon"))

// console.log(user, product, purchase)

// APPI E EXPRESS 

const app = express()


app.use(express.json())

app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

// BUSCANDO TODOS OS USUÁRIOS

app.get("/users", (req: Request, res: Response) => {

    res.status(200).send(users)

})

// BUSCANDO TODOS OS PRODUTOS

app.get("/products", (req: Request, res: Response) => {

    res.status(200).send(products)

})

// BUSCANDO PRODUTO PELO NOME

app.get("/products/search", (req: Request, res: Response) => {

    const q = req.query.query as string

    const result = q ? products.filter(item => item.name.toLowerCase().includes(q.toLowerCase())

    ) : products

    res.status(200).send(result)
})


// CRIANDO USUÁRIO

app.post("/users", (req: Request, res: Response) => {

    const id: string = req.body.id
    const email: string = req.body.email
    const password: string = req.body.password

    const newUser: TUsers = {
        id, email, password
    }

    users.push(newUser)

    console.log("Usuários", users)

    res.status(201).send("Cadastro realizado com sucesso")

})

// CRIANDO PRODUTO

app.post("/products", (req: Request, res: Response) => {

    const id: string = req.body.id
    const name: string = req.body.name
    const price: number = req.body.price
    const category: CATEGORY = req.body.category

    const newProduct: TProducts = {
        id, name, price, category
    }

    products.push(newProduct)

    console.log("Produtos", products)

    res.status(201).send("Produto cadastrado com sucesso")

})

// CRIANDO COMPRA

app.post("/purchases", (req: Request, res: Response) => {

    const userId: string = req.body.userId
    const productId: string = req.body.productId
    const quantity: number = req.body.quantity
    const totalPrice: number = req.body.totalPrice

    const newPurchase: TPurchases = {
        userId, productId, quantity, totalPrice
    }

    purchases.push(newPurchase)

    console.log("Compras", products)

    res.status(201).send("Compra realizada com sucesso")

})