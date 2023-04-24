export type TUsers = {
    id: string,
    name: string,
    email:string,
    password: string, 
    createdAt: string
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
    description: string,
    imageUrl: string
    // category: CATEGORY
}

export type TPurchases = {
    id: string,
    buyer: string,
    totalPrice: number,
    createdAt: string,
    paid: number
}