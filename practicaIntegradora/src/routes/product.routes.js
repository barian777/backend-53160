import { Router } from "express";
import { uploader } from "../uploader.js";
import productsModel from "../dao/models/products.model.js"

const router = Router();

router.get('/', async (req, res) => {
    try {
        const listProducts = await productsModel.find().lean()
        res.status(200).send({origin : "serverAtlas", payload : listProducts})
    } catch (error) {
        console.error("Error al intentar obtener los productos:", error);
        res.status(500).send({origin : "serverAtlas", payload : "No se pudo obtener los productos."})
    }
})

router.post('/', uploader.single('thumbnail'), async (req, res) => {
    try {
        const newProduct = await productsModel.create(req.body)
        res.status(200).send({origin : "serverAtlas", payload : `${newProduct} se cargo con exito.`})
    } catch (error) {
        console.error("Error al intentar cargar el producto:", error);
        res.status(500).send({origin : "serverAtlas", payload : "No se pudo cargar el producto."})
    }
})

router.put('/:id', async (req, res) => {})

router.delete('/:id', async (req, res) => {})

export default router;