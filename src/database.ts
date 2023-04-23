import { TUsers, TProducts, TPurchases, CATEGORY } from "./types";

export const users: TUsers[] = [
    {
        id: "u001",
        email: "daniel@email.com",
        password: "451278"
    }, {
        id: "u002",
        email: "jhon@email.com",
        password: "469878"
    }
]

export function createUser(id: string, email: string, password: string) {

    const newUser: TUsers = { id, email, password }

    users.push(newUser)

    console.log("Usuário cadastrado com sucesso")
}

export function getAllUsers(): void {
    console.table(users)
}

export const products: TProducts[] = [
    {
        id: "prod0001",
        name: "Camiseta",
        price: 30,
        category: CATEGORY.CLOTHES_AND_SHOES
    }, {
        id: "prod0002",
        name: "Televisão",
        price: 2500,
        category: CATEGORY.ELECTRONICS
    }
]

export function createProduct(id: string, name: string, price: number, category: CATEGORY) {

    const newProduct: TProducts = { id, name, price, category }

    products.push(newProduct)

    console.log("Produto cadastrado com sucesso")

}

export function getAllProducts(): void {

    console.table(products)

}

export function queryProductsByName(q: string): TProducts[] {

    return products.filter((item) => item.name.toLowerCase().includes(q.toLowerCase()))

}

export function getProductById(id: string) {
    products.find((item) => {
        if (item.id === id) {
            return console.table(item)
        }
    })
}

export const purchases: TPurchases[] = [
    {
        userId: "u001",
        productId: "prod0002",
        quantity: 1,
        totalPrice: 2500
    }, {
        userId: "u002",
        productId: "prod0001",
        quantity: 3,
        totalPrice: 90
    }
]

export function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number): string {

    purchases.push({ userId, productId, quantity, totalPrice })

    return "Compra realizada com sucesso"
}

export function getAllPurchasesFromUserId(userIdToSearch: string): TPurchases[] {

    return purchases.filter((item) => 

        item.userId === userIdToSearch
    )
}






