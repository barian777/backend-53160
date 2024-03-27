class ProductManager{
    constructor(){
        this.products = [];
        this.idGenerator = 1000;
    }

    getProducts() {
        return this.products
    }

    addProduct({title, description, price, thumbnail, code, stock}){
        const id = this.idGenerator++
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
        return productById || "El ID de producto ingresado no existe."
        
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
    id:"",
});

products.addProduct({
    title:"producto prueba",
    description:"Este es un producto prueba",
    price:200,
    thumbnail:"sin imagen",
    code:"asd13",
    stock:10, 
    id:"",
});

products.addProduct({
    title:"producto prueba",
    description:"Este es un producto prueba",
    price:200,
    thumbnail:"sin imagen",
    code:"asd14",
    stock:10, 
    id:"",
});

console.log("LIsta de productos:");
console.log(products.getProducts());
console.log("---------------------");
console.log("Producto solicitado");
console.log(products.getProductById(1000));


