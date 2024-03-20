import { cartModels } from "../../model/mongo-models/carts.js";


class CartsService {
    constructor() {
        this.cartsModel = cartModels;
    }

    async getCartById(cartId) {
        return await this.cartsModel.findById(cartId);
    }

    async createCart() {
        return await this.cartsModel.create({});
    }

    async addProductsToCart(cartId, productId, quantity) {
        const cart = await this.cartsModel.findById(cartId);
        const product = cart.products.find((product) => product.product.toString() === productId);

        if (product) {
            product.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        return await cart.save();
    }

    async deleteAllProductsFromCart(cartId) {
        const cart = await this.cartsModel.findById(cartId);
      
        if (!cart) {
          throw new Error("Carrito no encontrado");
        }
      
        cart.products = [];
      
        return await cart.save();
      }

    async deleteProductCart(cartId, productId) {
        const cart = await this.cartsModel.findById(cartId);
        const productIndex = cart.products.findIndex((product) => product.product.toString() === productId);
      
        if (productIndex === -1) {
          throw new Error('Producto no encontrado en el carrito');
        }
      
        cart.products.splice(productIndex, 1);
      
        return await cart.save();
      }

      async updateCartProducts(cartId, products) {
        const cart = await this.cartsModel.findById(cartId);
      
        if (!cart) {
          throw new Error("Carrito no encontrado");
        }
      
        cart.products = products;
      
        return await cart.save();
      }

      async updateProductQuantity(cartId, productId, quantity) {
        const cart = await this.cartsModel.findById(cartId);
      
        if (!cart) {
          throw new Error("Carrito no encontrado");
        }
      
        const productIndex = cart.products.findIndex(
          (product) => product.product.toString() === productId
        );
      
        if (productIndex === -1) {
          throw new Error("Producto no encontrado en el carrito");
        }
      
        cart.products[productIndex].quantity = quantity;
      
        return await cart.save();
      }


    async getAllCarts() {
        return await this.cartsModel.find({});
      }
}

export default CartsService;