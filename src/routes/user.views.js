import express from "express";

const router = express.Router();

router.get("/login", (req, res) => {
    res.render('login')
});

router.get("/register", (req, res) => {
    res.render('register')
});

// Cuaando ya tenemos una session activa con los datos del user, renderizamos la vista profile
router.get("/", (req, res) => {
    res.render('profile', {
        user: req.session.user
    })
});

export default router;