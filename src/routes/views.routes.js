import express from 'express';
import cookieParser from 'cookie-parser';


const router = express.Router();

router.get('/', (req, res) =>{
    res.render('index', {})
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

router.get("/carrito", (req, res) => {
    res.render("carrito");
});

router.use(cookieParser('CoderS3cr3tC0d3'));


router.get('/setcookie', (req, res) => {
    
    res.cookie("CoderCookie", "Esto es una Cookie de prueba - Cookie set", { maxAge: 80000, signed: true }).send('Cookie asignada con exito!!')
});



router.get('/getcookie', (req, res) => {
    res.send(req.signedCookies)
});


router.get('/deletecookie', (req, res) => {
    res.clearCookie('CoderCookie').send('Cookie borrada!!')
});


/*router.get('/session', (req, res) => {
    
    if (req.session.counter) {
        req.session.counter ++
        res.send(`Se ha visitado este sitio ${req.session.counter} veces.`);
    } else {
        req.session.counter = 1;
        console.log("Inicializando contador");
        res.send("Bienvenido!")
    }
});*/

// destruir la session
router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.json({ error: "error logout", mensaje: "Error al cerrar la sesion" })
        }
        res.send("Session cerrada correctamente")
    })
});

// http://localhost:8080/login?username=pepe&password=pepepass
router.get('/login', (req, res) => {
    const { username, password } = req.query;
    if (username !== 'adminCoder@coder.com' || password !== 'adminCod3r123') {
        return res.status(401).send("Login Failed, check your credentials.");
    } else {
        req.session.user = username;
        req.session.admin = false;

        res.send('Login Success!!')
    }
});


// Auth Middleare
function auth(req, res, next) {
    if (req.session.user === 'pepe' && req.session.admin) {
        return next()
    } else {
        return res.status(403).send("Usuario no autorizado para ingresar a este recurso.");
    }
}



router.get('/private', auth, (req, res) => {
    res.send("si estas viendo esto es porque eres un susario Admin y estas logueado, con session activa")
});

export default router;