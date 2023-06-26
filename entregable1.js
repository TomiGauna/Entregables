class Product {

    static id = 1

    constructor({title, description, price, thumbnail, code, stock}){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = Product.id++

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return new Error('All keys must have a value')
        }

    }
}

class ProductManager {
    constructor (){
        this.products = []
    }

    addProduct({title, description, price, thumbnail, code, stock, id}) {

        const createdProd = new Product ({title, description, price, thumbnail, code, stock, id})

        if (this.products.some((prod) => prod.code == code)) {
            return Error('Invalid code. Existent article')
        } else {
            this.products.push(createdProd);
        }

        
        
        
    };

    getProducts(){
        return this.products
    };

    getProductbyId(id){
        const selectedProd = this.products.find((prod) => prod.id === id)
        
        
        if (!selectedProd) {
            return Error('The item does not exist')
        } else {
            return selectedProd
        }
        
    };

}

const prodManager = new ProductManager();

prodManager.addProduct({title: 'Apple iPhone 13', 
        description: 'Built and Designed by Apple Inc', 
        price: 350000,
        thumbnail: 'none',
        code: 321,
        stock: 10});

prodManager.addProduct({title: 'Moto G72', 
        description: 'Made by Motorola', 
        price: 83000,
        thumbnail: 'none',
        code: 124,
        stock: 30});

prodManager.addProduct({title: 'Beats Solo3 Headphones', 
        description: 'Wireless Headphones made by Beats by Dr. Dre', 
        price: 238000,
        thumbnail: 'none',
        code: 125,
        stock: 15});

prodManager.addProduct({title: 'Galaxy Buds In-Ear Headphones', 
        description: 'Wireless Headphones fabricated and distributed by Samsung', 
        price: 78000,
        thumbnail: 'none',
        code: 125,
        stock: 50})

console.log(prodManager.getProducts());