import { user, product, purchase, createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";
import { CATEGORY } from "./types";

console.log("O aplicativo foi iniciado")

// EXERCÍCIO 3 - TYPESCRIPT I


createUser("João", "João@email.com","452879")

getAllUsers()

createProduct("0303","Calça",50,CATEGORY.CLOTHES_AND_SHOES)

getAllProducts()

getProductById("0202")

console.table(queryProductsByName("televisão"))

createPurchase("Daniel", "0202", 2, 5000)

console.log(getAllPurchasesFromUserId("Jhon"))

// console.log(user, product, purchase)
