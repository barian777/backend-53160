import { Router } from "express";
import { uploader } from "../uploader.js";
import ManagerProducts from "../dao/managerProduct.mdb.js"

const router = Router();

const manager = new ManagerProducts();

router.get('/', async (req, res) => {
    try {
        const listProducts = await manager.getAll()
        res.status(200).send({origin : "serverAtlas", payload : listProducts})
    } catch (error) {
        console.error("Error al intentar obtener los productos:", error);
        res.status(500).send({origin : "serverAtlas", payload : "No se pudo obtener los productos."})
    }
})

router.get('/:id', async (res,req) => {
    try {
        const productSelect = await manager.getById(req.params.id)
        res.status(200).send({origin : "serverAtlas", payload : productSelect})
    } catch (error) {
        console.error("Error al intentar obtener el producto:", error);
        res.status(500).send({origin : "serverAtlas", payload : "No se pudo obtener el producto."})
    }
})

router.post('/', uploader.single('thumbnail'), async (req, res) => {
    try {
        const socketServer = req.app.get('socketServer');
        const newProduct = await manager.add(req.body)
        res.status(200).send({origin : "serverAtlas", payload : `${newProduct} se cargo con exito.`})
        socketServer.emit('newProduct', req.body);
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
        const productUpdated = await manager.update(filter, update, options);

        res.status(200).send({origin : "serverAtlas", payload : `${productUpdated} <br/>Se actualizo exitosamente.`})

    } catch (error) {
        console.error("Error al intentar actualizar el producto:", error);
        res.status(500).send({origin : "serverAtlas", payload : "No se pudo actualizar el producto."})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const filter = {_id: req.params.id};
        const productDelete = await manager.delete(filter)

        res.status(200).send({origin : "serverAtlas", payload : `El producto ${productDelete} se elimino con exito.`})
    } catch (error) {
        console.error("Error al intentar eliminar el producto:", error);
        res.status(500).send({origin : "serverAtlas", payload : "No se pudo eliminar el producto."})
    }
})

export default router;