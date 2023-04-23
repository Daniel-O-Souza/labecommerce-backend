import { users, products, purchases, createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";
import { CATEGORY, TProducts, TPurchases, TUsers } from "./types";
import express, { Request, Response } from 'express'
import cors from 'cors'



console.log("O aplicativo foi iniciado")

// EXERCÍCIO 3 - TYPESCRIPT I ###############################################################################


createUser("u003", "João@email.com", "452879")

getAllUsers()

createProduct("prod0003", "Calça", 50, CATEGORY.CLOTHES_AND_SHOES)

getAllProducts()

getProductById("prod0002")

console.table(queryProductsByName("televisão"))

createPurchase("u001", "prod0002", 2, 5000)

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

app.get("/users", (req: Request, res: Response) => {

    try {
        res.status(200).send(users)
    } catch (error) {
        res.send(error.message)
    }
})

// BUSCANDO TODOS OS PRODUTOS ###############################################################################

app.get("/products", (req: Request, res: Response) => {

    try {
        res.status(200).send(products)
    } catch (error) {
        res.send(error.message)
    }
})

// BUSCANDO PRODUTO PELO NOME ###############################################################################

app.get("/products/search", (req: Request, res: Response) => {

    try {
        const q = req.query.q as string

        const result = q ? products.filter(item => item.name.toLowerCase().includes(q.toLowerCase())

        ) : products

        if (q.length < 1) {
            res.status(404)
            throw new Error("A busca deve conter ao menos um caractere.")
        }

        res.status(200).send(result)

    } catch (error) {
        res.send(error.message)
    }
})


// CRIANDO USUÁRIO ###############################################################################

app.post("/users", (req: Request, res: Response) => {

    try {

        const id: string = req.body.id
        const email: string = req.body.email
        const password: string = req.body.password

        const newUser: TUsers = {
            id, email, password
        }

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("Id deve ser do tipo string")
        }

        if (typeof email !== "string") {
            res.status(400)
            throw new Error("Email deve ser do tipo string")
        }

        if (typeof password !== "string") {
            res.status(400)
            throw new Error("Password deve ser do tipo string")
        }

        if (users.find((newUserId) => newUserId.id === id)) {
            res.status(400)
            throw new Error("Digite outro id, o id utilizado já está cadastrado")
        }

        if (users.find((newUserEmail) => newUserEmail.email === email)) {
            res.status(400)
            throw new Error("Digite outro email, o email utilizado já está cadastrado")
        }

        users.push(newUser)

        console.log("Usuários", users)

        res.status(201).send("Cadastro realizado com sucesso")

    } catch (error) {
        res.send(error.message)
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

app.post("/products", (req: Request, res: Response) => {

    try {
        const id: string = req.body.id
        const name: string = req.body.name
        const price: number = req.body.price
        const category: CATEGORY = req.body.category

        const newProduct: TProducts = {
            id, name, price, category
        }

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
            throw new Error("Preço do produto deve ser do tipo string")
        }

        if (products.find((newProductId) => newProductId.id === id)) {
            res.status(400)
            throw new Error("Digite outro id para o produto, o id utilizado já está cadastrado")
        }

        products.push(newProduct)

        console.log("Produtos", products)

        res.status(201).send("Produto cadastrado com sucesso")

    } catch (error) {
        res.send(error.message)
    }
})

// EDITAR PRODUTO PELO ID ###############################################################################

app.put("/products/:id", (req: Request, res: Response) => {

    try {
        const id: string = req.params.id

        const newName: string | undefined = req.body.name
        const newPrice: number | undefined = req.body.price
        const newCategory: CATEGORY | undefined = req.body.category

        const product: TProducts = products.find((item) => item.id === id)

        if (!product) {
            res.status(400)
            throw new Error("O id do produto digitado não existe, digite o id de um produto cadastrado")
        }

        if (typeof newName !== "string") {
            res.status(400)
            throw new Error("O nome do produto deve ser do tipo string")
        }

        if (typeof newPrice !== "number") {
            res.status(400)
            throw new Error("O preço do produto deve ser do tipo number")
        }

        if (typeof newCategory !== "string") {
            res.status(400)
            throw new Error("A categoria do do produto deve ser do tipo string")
        }

        if (product) {
            product.name = newName || product.name
            product.price = isNaN(newPrice) ? product.price : newPrice
            product.category = newCategory || product.category
        }

        console.log("depois", product)

        res.status(201).send("Produto atualizado com sucesso")
    } catch (error) {
        res.send(error.message)
    }

})

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

app.get("/products/:id", (req: Request, res: Response) => {

    try {

        const id: string = req.params.id

        const result: TProducts = products.find((item) => item.id === id)

        if (!result) {
            res.status(400)
            throw new Error("O id do produto buscado não existe, digite um id existente.")
        }

        res.status(200).send(result)

    } catch (error) {
        res.send(error.message)
    }
})

// CRIANDO COMPRA ###############################################################################

app.post("/purchases", (req: Request, res: Response) => {

    try {

        const userId: string = req.body.userId
        const productId: string = req.body.productId
        const quantity: number = req.body.quantity
        const userExists = users.find((user) => user.id === userId)
        const productExists = products.find((product) => product.id === productId)
        const productValue = productExists.price
        const totalPrice: number = quantity * productValue

        const newPurchase: TPurchases = {
            userId, productId, quantity, totalPrice
        }

        if (typeof userId !== "string") {
            res.status(400)
            throw new Error("Id do usuário deve ser do tipo string")
        }

        if (typeof productId !== "string") {
            res.status(400)
            throw new Error("Id do produto deve ser do tipo string")
        }

        if (typeof quantity !== "number") {
            res.status(400)
            throw new Error("Quantidade do produto deve ser do tipo number")
        }

        if (typeof totalPrice !== "number") {
            res.status(400)
            throw new Error("Preço total da compra deve ser do tipo number")
        }

        if (!userExists) {
            res.status(400)
            throw new Error("O id do usuário não existe, informe o id de um usúario cadastrado.")
        }

        if (!productExists) {
            res.status(400)
            throw new Error("O id do produto não existe, informe o id de um produto cadastrado.")
        }

        purchases.push(newPurchase)

        console.log("Compras", products)

        res.status(201).send("Compra realizada com sucesso")

    } catch (error) {
        res.send(error.message)
    }

})

// BUSCAR COMPRAS DO USUÁRIO PELO ID ###############################################################################

app.get("/users/:id/purchases", (req: Request, res: Response) => {

    try {
        const id: string = req.params.id

        const result: TPurchases = purchases.find((item) => item.userId === id)

        if (!result) {
            res.status(400)
            throw new Error("O id do usuário não existe, informe o id de um usúario cadastrado.")
        }

        res.status(200).send(result)

    } catch (error) {
        res.send(error.message)
    }
})