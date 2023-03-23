export type TUsers = {
    id: string,
    email:string,
    password: string
}

export enum CATEGORY {
    ACESSORIES = "Acessórios",
    CLOTHES_AND_SHOES = "Roupas e calçados",
    ELECTRONICS = "Eletrônicos"
}

export type TProducts = {
    id: string,
    name: string,
    price: number,
    category: CATEGORY
}

export type TPurchases = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}