import { TUsers, TProducts, TPurchases, CATEGORY } from "./types";

export const users: TUsers[] = [
    {
        id: "u001",
        name:"Daniel",
        email: "daniel@email.com",
        password: "451278",
        createdAt: "2023-04-24 14:23:08"
    }, {
        id: "u002",
        name: "Jhon",
        email: "jhon@email.com",
        password: "469878",
        createdAt: "2023-04-24 14:23:08"
    }
]

export function createUser(id: string, name:string, email: string, password: string, createdAt: string) {

    const newUser: TUsers = { id, name, email, password, createdAt }

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
        description: "Camiseta da banda Metallica",
        imageUrl: "https://picsum.photos/200"
        // category: CATEGORY.CLOTHES_AND_SHOES
    }, {
        id: "prod0002",
        name: "Televisão",
        price: 2500,
        description: "Camiseta da banda U2",
        imageUrl: "https://picsum.photos/200"
        // category: CATEGORY.ELECTRONICS
    }
]

export function createProduct(id: string, name: string, price: number, description: string, imageUrl: string) {

    const newProduct: TProducts = { id, name, price, description, imageUrl }

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
        id: "pur0012",
        buyer: "u002",
        totalPrice: 1000,
        createdAt: "2023-04-24 14:23:08",
        paid: 0
    }, {
        id: "pur0013",
        buyer: "u003",
        totalPrice: 2000,
        createdAt: "2023-04-24 14:23:08",
        paid: 0
    }
]

export function createPurchase(id: string, buyer: string, totalPrice: number, createdAt: string, paid: number): string {

    purchases.push({ id, buyer, totalPrice, createdAt, paid })

    return "Compra realizada com sucesso"
}

export function getAllPurchasesFromUserId(userIdToSearch: string): TPurchases[] {

    return purchases.filter((item) => 

        item.buyer === userIdToSearch
    )
}






