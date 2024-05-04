import ProductManager from "../../secondChallenge/secondChallenge.js";
import express from "express";

const PORT = 5000;
const app = express();
const manager = new ProductManager("../../secondChallenge/products.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/products", async (req, res) => {
  const limit = +req.query.limit || 0;
  const products = await manager.getProducts(limit);
  res.status(200).send({ origin: "server1", payload: products });
});

app.get("/api/products/:pid", async (req, res) => {
  const product = await manager.getProductById(req.params.pid);
  res.status(200).send({ origin: "server1", payload: product });
});

app.post("/api/products", async (req, res) => {
  try {
    const body = req.body;
    if (
      req.body.title &&
      req.body.description &&
      req.body.code &&
      req.body.price &&
      req.body.status &&
      req.body.stock &&
      req.body.category &&
      req.body.thumbnail
    ) {
      await manager.addProduct(body);
      res.status(200).send({ origin: "server1", payload: body });
    } else {
      res.status(400).send({origin: "server1", payload: "Por favor complete todos los campos",});
    }
  } catch (error) {
    res.status(500).send({ origin: "server1", payload: "Se produjo un error" });
  }
});

app.delete("/api/products/:pid", async (req, res) => {
    try {
        const productId = +req.params.pid;
        const productDeleted = await manager.deleteProduct(productId);

        if (productDeleted) {
            res.status(200).send({ origin: "server1", payload: "El producto se eliminó con éxito." });
        } else {
            res.status(404).send({ origin: "server1", payload: "No se encontró el producto para eliminar." });
        }
    } catch (error) {
        res.status(500).send({ origin: "server1", payload: "Se produjo un error." });
    }
});

app.put("/api/pro/:pid", async (req, res) => {
  const productId = +req.params.pid;

  // Lee el cuerpo de la solicitud
  let body = '';
  req.on('data', chunk => {
      body += chunk.toString(); // Convierte el fragmento de datos en una cadena
  });

  req.on('end', async () => {
      try {
          // Parsea el cuerpo como JSON
          const { prop, value } = JSON.parse(body);

          // Tu lógica para actualizar el producto aquí
          console.log(productId, prop, value);
          const updated = await manager.upPro(productId, prop, value );

          if (updated) {
              res.status(200).send({ origin: "server1", payload: "El producto se actualizó con éxito." });
          } else {
              res.status(404).send({ origin: "server1", payload: "No se encontró el producto para actualizar." });
          }
      } catch (error) {
          console.error("Error al intentar actualizar el producto:", error);
          res.status(500).send({ origin: "server1", payload: "Se produjo un error al intentar actualizar el producto." });
      }
  });
});


app.put("/api/products/:pid", async (req, res) => {
    const productId = parseInt(req.params.pid);
    const { prop, value } = req.body; 

    try {
        const updated = await manager.updateProduct(productId, prop, value);

        if (updated) {
            res.status(200).send({ origin: "server1", payload: "El producto se actualizó con éxito." });
        } else {
            res.status(404).send({ origin: "server1", payload: "No se encontró el producto para actualizar." });
        }
    } catch (error) {
        console.error("Error al intentar actualizar el producto:", error);
        res.status(500).send({ origin: "server1", payload: "Se produjo un error al intentar actualizar el producto." });
    }
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});


