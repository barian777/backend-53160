import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const manager = new ProductManager("./ddbb/products.json")
const router = Router()

router.get('/home', async(req, res) => {
    const productsParsed = await manager.getProducts(0)
    const listProduct = {listProducts : productsParsed}
    res.render('home', listProduct )
    
})

router.get('/realtimeproducts', async (req,res) => {
    const productsParsed = await manager.getProducts(0)
    const listProduct = {listProducts : productsParsed}
    res.render('realtimeproducts', listProduct )
})

router.get('/chat', (req, res) => {
    res.render('chat', {})
})

export default router;