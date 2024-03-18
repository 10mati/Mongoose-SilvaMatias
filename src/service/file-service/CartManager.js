import { promises as fs } from 'fs'
import ProductManager from "./ProductManager.js"

const productsAll = new ProductManager

class CartManager {
    constructor() {
        this.path = "./src/Models/carts.json"
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)
    }

    writeCarts = async (carts) => {
        await fs.writeFile(this.path, JSON.stringify(carts))
    }

    addCart = async (cart) => {
        let cartOld = await this.readCarts()
        const lastId = cartOld.reduce((maxId, cart) => Math.max(maxId, cart.id), 0) + 1;
        cart.id = lastId;
        let cartConcat = [{ id: cart.id, products: [] }, ...cartOld]
        await this.writeCarts(cartConcat)
        return "Carrito Agregado"
    }

    getCartById = async (id) => {
        let carts = await this.readCarts()
        let cartById = carts.find(cart => cart.id === id)
        if (!cartById) return "Producto no encontrado"
        return cartById
    }

    addProductInCart = async (cartId, productId) => {
        let carts = await this.readCarts()
        let cartById = carts.find(cart => cart.id === cartId)
        if (!cartById) return "Producto no encontrado"

        let products = await productsAll.readProducts()
        let productById = products.find(prod => prod.id === productId)
        if (!productById) return "Producto no encontrado"

        let productIndex = cartById.products.findIndex((product) => product.id === productId);
        if (productIndex === -1) {
            cartById.products.push({ id: productId, quantity: 1 });
        } else {
            cartById.products[productIndex].quantity++;
        }

        await this.writeCarts(carts)
        return "Producto Agregado al Carrito"


    }

}
export default CartManager;