import fs from 'fs';

class ProductManager{

    static idGenerator = 1000;

    constructor(filePath){
        this.path = filePath;
    }

    async getProducts(limit) {
        try {
            const products = await fs.promises.readFile(this.path)
            const productsParsed = await JSON.parse(products)
            return limit === 0 ? productsParsed: productsParsed.slice(0, limit)
        } catch (error) {
            return "Se produjo un error."
        }
    }

    async addProduct({title, description, code, price, status, stock, category,thumbnail }){
        try {
            const products = await this.getProducts(0);

            const lastProductId = products.length > 0 ? products[products.length - 1].id : ProductManager.idGenerator;
            const id = lastProductId + 1;
            
            let codeValidation = products.some(product => product.code === code)
            if(codeValidation === true){
                console.error("El código de producto ingresado esta repetido. Porfavor ingrése un producto con otro código.");
            }else{
                const newProduct= {
                    title,
                    description,
                    code,
                    price,
                    status,
                    stock,
                    category,
                    thumbnail,
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
            const products = await this.getProducts(0);
            const productById = products.find(element => element.id === parseInt(id))
            return productById || 1;
        } catch (error) {
            return "Se produjo un error."
        }     
    }
    
    async deleteProduct(id){
        try {
            const products = await this.getProducts(0)
            const validationID = products.some(product => product.id === id)
            if(validationID){
                const filteredProducts = products.filter((product) => {return product.id !== id})
                await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts, null, 2))
                return true;
            }else{
                return false;
            }
        } catch (error) {
            return "Se produjo un error."
        }
    }


/*El metodo update recibe como parametro el id del producto, la propiedad que desea actualizar y el valor nuevo */
    async updateProduct(id, prop, value){
    try {
            const products = await this.getProducts(0)
            const parseId = +id;
            const index = products.findIndex(product => product.id === parseId);
            if(prop === "price" || prop === "stock"){
                if (index !== -1){
                    const updatedProduct = {...products[index]}
                    updatedProduct[prop] = +value
                    products[index] = updatedProduct
                    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
                    return true;
                }else{
                    return false;
                }
            } else{
                if (index !== -1){
                    const updatedProduct = {...products[index]}
                    updatedProduct[prop] = value
                    products[index] = updatedProduct
                    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
                    return true;
                }else{
                    return false;
                }
            }
        } catch (error) {
            return "Se produjo un error."
        }
    }
    
    /*async upPro(id, prop, value) {
        try {
            const selectProduct = await this.getProductById(+id);
            if (!selectProduct) {
                console.log("Producto no encontrado");
                return false;
            }
    
            const jsonContent = await fs.promises.readFile(this.path, 'utf-8');
            const allproducts = JSON.parse(jsonContent);
    
            const index = allproducts.findIndex(product => product.id === selectProduct.id);
            if (index === -1) {
                console.log("Producto no encontrado en la lista de productos.");
                return false;
            }
    
            selectProduct[prop] = value;
            allproducts[index] = selectProduct;
    
            await fs.promises.writeFile(this.path, JSON.stringify(allproducts, null, 2));
            return true;
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            return false;
        }
    }*/
    
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
//console.log(await listProduct.getProductById(1003));

//console.log(await listProduct.deleteProduct(1007));

//const llamado = await listProduct.upPro(1004, "stock", 100);
//console.log("llamado: " + llamado);

export default ProductManager;