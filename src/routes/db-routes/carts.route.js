import { Router } from "express";
import  CartsService from "../../service/db-service/cartService.js"

const CartRouter = Router();
const cartsService = new CartsService();

CartRouter.get("/", async (req, res) => {
    try {
        res.send(await cartsService.getAllCarts())
    } catch (error) {
        next(error)
    }
  });

// GET /api/carts/:cid
CartRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartsService.getCartById(cid);
    if (!cart) {
      return res.status(404).send({ status: "error", error: "Carrito no encontrado" });
    }
    cart.populate("products.product").then(() => {
      res.send({ status: "success", payload: cart });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message });
  }
});

// POST /api/carts
CartRouter.post("/", async (req, res) => {
    try {
        const newCart = await cartsService.createCart();
        res.status(201).send({ status: "success", payload: newCart });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error",  error: error.message });
    }
});

// POST /api/carts/:cid/product/:pid
CartRouter.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
      const updatedCart = await cartsService.addProductsToCart(cid, pid, quantity);
      res.status(201).send({ status: "success", payload: updatedCart });
    } catch (error) {
        res.status(500).send({ status: "error",  error: error.message });
    }
});

// DELETE /api/carts/:cid/product/:pid
CartRouter.delete("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;

    try {
      const updatedCart = await cartsService.deleteProductCart(cid, pid);
      res.status(201).send({ status: "success", payload: updatedCart });
    } catch (error) {
        res.status(500).send({ status: "error",  error: error.message });
    }
});

CartRouter.delete("/:cid/products", async (req, res) => {
    const { cid } = req.params;
  
    try {
      const updatedCart = await cartsService.deleteAllProductsFromCart(cid);
      res.status(201).send({ status: "success", payload: updatedCart });
    } catch (error) {
      res.status(500).send({ status: "error", error: error.message });
    }
  });

CartRouter.put("/:cid/products", async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
  
    try {
      const updatedCart = await cartsService.updateCartProducts(cid, products);
      res.status(201).send({ status: "success", payload: updatedCart });
    } catch (error) {
      res.status(500).send({ status: "error", error: error.message });
    }
  });

  CartRouter.put("/:cid/products/:pid/quantity", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
  
    try {
      const updatedCart = await cartsService.updateProductQuantity(cid, pid, quantity);
      res.status(201).send({ status: "success", payload: updatedCart });
    } catch (error) {
      res.status(500).send({ status: "error", error: error.message });
    }
  });


  

export default CartRouter;