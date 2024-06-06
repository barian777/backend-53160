import { Router } from 'express';
import productsModel from "../dao/models/products.model.js";
import config from '../config.js';

const router = Router();

router.get('/chat', (req, res) => {
    res.render('chat', {});
});

router.get('/products', async (req, res) => {
    const data = await productsModel.find().lean();
    res.render('products', { data: data });
});

router.get('/realtime_products/:page', async (req, res) => {
    const limit = config.PRODUCTS_PER_PAGE
    const page = +req.params.page

    const data = await productsModel.paginate({},{page:page, limit:limit});
    res.render('realtime_products', { data: data });
})    
    

export default router;