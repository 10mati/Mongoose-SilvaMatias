import express from "express";
import { passportCall, authorization } from "../utils.js";


const router = express.Router();

router.get("/login", (req, res) => {
    res.render('login')
});

router.get("/register", (req, res) => {
    res.render('register')
});

router.get("/", (req, res) => {
    passportCall('jwt'), 
    authorization('user'),
    res.render('profile', {
        user: req.user
    })
});

router.get("/error", (req, res) => {
    res.render("error");
});

export default router;