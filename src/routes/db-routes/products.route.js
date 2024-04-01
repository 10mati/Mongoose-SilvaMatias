import { Router } from "express";
import ProductsService from "../../service/db-service/productService.js"
import { productModels } from "../../model/mongo-models/products.js";


const ProductRouter = Router()
const productsService = new ProductsService();

ProductRouter.get('/', async (req, res) => {
  let limit = parseInt(req.query.limit) || 10;
  let page = parseInt(req.query.page);
  if (!page) page = 1
  let result = await productModels.paginate({}, { page: page, limit: limit, lean: true })
  console.log('Resultado de la consulta:', result);

  result.prevLink = result.hasPrevPage ? `http://localhost:8080/api/productos?page=${result.prevPage}` : '';
  result.nextLink = result.hasNextPage ? `http://localhost:8080/api/productos?page=${result.nextPage}` : '';

  result.isValid = !(page < 1 || page > result.totalPages)

  res.render("productos", result)
})


// GET /api/products
ProductRouter.get('/', async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await productsService.getAllProducts(parseInt(limit));
    res.status(200).send({ status: "success", payload: products });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error",  error: error.message});
  }
});

// GET /api/products/:pid
ProductRouter.get('/:pid', async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productsService.getProductById(pid);
    if (!product) {
      return res.status(404).send({ status: "error",  error: 'Product not found' });
    }
    res.status(200).send({ status: "success", payload: product });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error",  error: error.message});
  }
});

// POST /api/products
ProductRouter.post('/', async (req, res) => {
  const newProduct = req.body;
  try {
    const product = await productsService.addProduct(newProduct);
    res.status(201).send({ status: "success", payload: product });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error",  error: error.message});
  }
});

// PUT /api/products/:pid
ProductRouter.put('/:pid', async (req, res) => {
  const { pid } = req.params;
  const updatedProductData = req.body;
  try {
    const updatedProduct = await productsService.updateProductById(pid, updatedProductData);
    res.status(201).send({ status: "success", payload: updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error",  error: error.message});
  }
});

// DELETE /api/products/:pid
ProductRouter.delete('/:pid', async (req, res) => {
  const { pid } = req.params;
  try { 
    await productsService.deleteProductById(pid);
     res.status(205).send({ status: "success", payload: null});
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error",  error: error.message});
  }
});

export default ProductRouter;