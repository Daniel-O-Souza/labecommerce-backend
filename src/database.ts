import { TUser, TProduct, TPurchase } from "./types";

export const user: TUser [] = [
    {
        id: "Daniel",
        email:"daniel@email.com",
        password: "451278" 
    }, {
        id: "Jhon",
        email:"jhon@email.com",
        password: "469878"  
    }
]

export const product: TProduct [] = [
    {
        id: "0101",
        name: "Camiseta",
        price: 30,
        category: "Vestuário"
    }, {
        id: "0202",
        name: "Televisão",
        price: 2500,
        category: "Eletrodomésticos"
    }
]

export const purchase: TPurchase [] = [
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