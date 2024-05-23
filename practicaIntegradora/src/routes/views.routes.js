import { Router } from 'express';
import productsModel from "../dao/models/products.model.js";

const router = Router();

router.get('/chat', (req, res) => {
    res.render('chat', {});
});

router.get('/products', async (req, res) => {
    const data = await productsModel.find().lean();
    res.render('products', { data: data });
});

export default router;