import fs from 'fs';

class ProductManager{

    static idGenerator = 1000;

    constructor(filePath){
        this.path = filePath;
    }

    async getProducts() {
        try {
            const products = await fs.promises.readFile(this.path)
            const productsParsed = await JSON.parse(products)
            return productsParsed
        } catch (error) {
            return "Se produjo un error."
        }
    }

    async addProduct({title, description, price, thumbnail, code, stock}){
        try {
            const products = await this.getProducts();

            const lastProductId = products.length > 0 ? products[products.length - 1].id : ProductManager.idGenerator;
            const id = lastProductId + 1;
            
            let codeValidation = products.some(product => product.code === code)
            if(codeValidation === true){
                console.log("El código de producto ingresado esta repetido. Porfavor ingrése un producto con otro código.");
            }else{
                const newProduct= {
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                    id,
                }
                products.push(newProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))

            }

        } catch (error) {
            return "Se produjo un error."
        }
    }

    async getProductById(id){
        try {
            const products = await this.getProducts();
            const productById = products.find(element => element.id === id)
            return productById || "El ID de producto ingresado no existe."
        } catch (error) {
            return "Se produjo un error."
        }
        
        
    }
    
    async deleteProduct(id){
        try {
            const products = await this.getProducts()
            const validationID = products.some(product => product.id === id)
            if(validationID ===true){
                const filteredProducts = products.filter((product) => {
                    return product.id !== id
                })
                await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts, null, 2))
                return "El producto se elimino de manera exitosa.";
            }else{
                return "No se puede eliminar un producto inexistente."
            }
        } catch (error) {
            return "Se produjo un error."
        }
    }

/*El metodo update recibe como parametro el id del producto, la propiedad que desea actualizar y el valor nuevo */
    async updateProduct(id, prop, value){
        try {
            const products = await this.getProducts()
            const productIndex = products.findIndex(product => product.id === id);
            if (productIndex !== -1){
                const updatedProduct = {...products[productIndex]}
                updatedProduct[prop] = value
                products[productIndex] = updatedProduct
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
                return "El producto se actualizo exitosamente."
            }else{
                return "No se puede actualizar un producto inexistente."
            }
        } catch (error) {
            return "Se produjo un error."
        }
    }
}

    

//const listProduct = new ProductManager('./products.json')

//console.log(await listProduct.getProducts());

    // await listProduct.addProduct({
    //     title:"producto prueba",
    //     description:"Este es un producto prueba",
    //     price:200,
    //     thumbnail:"sin imagen",
    //     code:"asd192",
    //     stock:10,
    // });
//console.log(await listProduct.getProductById(1007));

//console.log(await listProduct.deleteProduct(1007));

//console.log(await listProduct.updateProduct(1007, "thumbnail","alfonso"));
