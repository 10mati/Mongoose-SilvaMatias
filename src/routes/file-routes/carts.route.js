import { Router } from "express";
import CartManager from "../../service/file-service/CartManager.js";


const cartRouter = Router();
const carts = new CartManager

cartRouter.get("/", async (req, res) => {
    try {
        res.send(await carts.readCarts())
    } catch (error) {
        next(error)
    }
})



cartRouter.get("/:cid", async (req, res) => {
    let id = parseInt(req.params.cid)
    try {
        res.send(await carts.getCartById(id))
    } catch (error) {
        next(error)
    }
})


cartRouter.post("/", async (req, res) => {
    try {
        const newCart = req.body;
        res.send(await carts.addCart(newCart))
    } catch (error) {
        next(error)
    }
})

cartRouter.post("/:cid/products/:pid", async (req, res) => {
    let cartId = parseInt(req.params.cid)
    let productId = parseInt(req.params.pid)
    try {
        res.send(await carts.addProductInCart(cartId, productId))
    } catch (error) {
        next(error)
    }
});



export default cartRouter;