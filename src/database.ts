import { TUser, TProduct, TPurchase, CATEGORY } from "./types";

export const user: TUser[] = [
    {
        id: "Daniel",
        email: "daniel@email.com",
        password: "451278"
    }, {
        id: "Jhon",
        email: "jhon@email.com",
        password: "469878"
    }
]

export function createUser(id: string, email: string, password: string) {

    const newUser: TUser = { id, email, password }

    user.push(newUser)

    console.log("Usuário cadastrado com sucesso")
}

export function getAllUsers(): void {
    console.table(user)
}

export const product: TProduct[] = [
    {
        id: "0101",
        name: "Camiseta",
        price: 30,
        category: CATEGORY.CLOTHES_AND_SHOES
    }, {
        id: "0202",
        name: "Televisão",
        price: 2500,
        category: CATEGORY.ELECTRONICS
    }
]

export function createProduct(id: string, name: string, price: number, category: CATEGORY) {

    const newProduct: TProduct = { id, name, price, category }

    product.push(newProduct)

    console.log("Produto cadastrado com sucesso")

}

export function getAllProducts(): void {

    console.table(product)

}

export function queryProductsByName(q: string): TProduct[] {

    return product.filter((item) => item.name.toLowerCase().includes(q.toLowerCase()))

}

export function getProductById(id: string) {
    product.find((item) => {
        if (item.id === id) {
            return console.table(item)
        }
    })
}

export const purchase: TPurchase[] = [
    {
        userId: "Daniel",
        productId: "0202",
        quantity: 1,
        totalPrice: 2500
    }, {
        userId: "Jhon",
        productId: "0101",
        quantity: 3,
        totalPrice: 90
    }
]

export function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number): string {

    purchase.push({ userId, productId, quantity, totalPrice })

    return "Compra realizada com sucesso"
}

export function getAllPurchasesFromUserId(userIdToSearch: string): TPurchase[] {

    return purchase.filter((item) => 

        item.userId === userIdToSearch
    )
}






