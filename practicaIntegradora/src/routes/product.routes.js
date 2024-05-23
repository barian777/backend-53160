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

router.put('/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const update = req.body;
        const options = { new: true };
        const productUpdated = await productsModel.findOneAndUpdate(filter, update, options);

        res.status(200).send({origin : "serverAtlas", payload : "La actualizacion fue exitosa."})

    } catch (error) {
        console.error("Error al intentar actualizar el producto:", error);
        res.status(500).send({origin : "serverAtlas", payload : "No se pudo actualizar el producto."})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const filter = {_id: req.params.id};
        const productDelete = await productsModel.findByIdAndDelete(filter)

        res.status(200).send({origin : "serverAtlas", payload : `El producto ${productDelete} se elimino con exito.`})
    } catch (error) {
        console.error("Error al intentar eliminar el producto:", error);
        res.status(500).send({origin : "serverAtlas", payload : "No se pudo eliminar el producto."})
    }
})

export default router;