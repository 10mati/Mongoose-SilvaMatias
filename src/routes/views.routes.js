import express from 'express';


const router = express.Router();

router.get('/', (req, res) =>{
    res.render('index')
})

router.get('/realTimeProducts', (req, res) =>{
    res.render('realTimeProducts')
})

router.get('/products', (req, res) =>{
    res.render('products')
})

router.get('/productos', (req, res) =>{
    res.render('productos', {})
})

router.get("/chat", (req, res) => {
    res.render("chat");
});

export default router;