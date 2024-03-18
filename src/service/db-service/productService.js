import { productModels } from "../../model/mongo-models/products.js";

class ProductsService {
    constructor() {
        this.productsModel = productModels;
    }

    async getAllProducts(limit) {
        return await this.productsModel.find().limit(limit);
    }

    async getProductById(productId) {
        return await this.productsModel.findById(productId);
    }

    async addProduct(productData) {
        return await this.productsModel.create(productData);
    }

    async updateProductById(productId, updatedProductData) {
        return await this.productsModel.findByIdAndUpdate(productId, updatedProductData, { new: true });
    }

    async deleteProductById(productId) {
        return await this.productsModel.findByIdAndDelete(productId);
    }
}

 export default ProductsService;