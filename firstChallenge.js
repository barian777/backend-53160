class ProductManager{
    constructor(){
        this.products = [];
    }

    getProducts() {
        return this.products
    }

    addProduct({title, description, price, thumbnail, code, stock,id}){
        let validationCode = this.products.some(product => product.code === code)
        if(validationCode === true){
            console.log("El código de producto ingresado esta repetido. Porfavor ingrése un producto con otro código.");
        } else{
            const newProduct= {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id,
        }

        this.products.push(newProduct)
        }
    };

    getProductById(id){
        let productById = this.products.find(element => element.id === id)
        let notFind = "El ID de producto ingresado no existe";

        if(productById){
            return productById
        }else{   
            return notFind;
        }
        
    }
}

const products = new ProductManager();

products.addProduct({
    title:"producto prueba",
    description:"Este es un producto prueba",
    price:200,
    thumbnail:"sin imagen",
    code:"asd12",
    stock:10,
    id:111, 
});

products.addProduct({
    title:"producto prueba",
    description:"Este es un producto prueba",
    price:200,
    thumbnail:"sin imagen",
    code:"asd13",
    stock:10,
    id:112, 
});


