const fs = require('fs');

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
    constructor (path){
        this.path = path;
        this.products = [];
    }

    getProducts = async() => {
        if (fs.existsSync(this.path)) {
            const info = await fs.promises.readFile(this.path,'utf-8');
            const prod = JSON.parse(info);
            return prod;
        } else {
            return [];
        }
    };

    addProduct = async({title, description, price, thumbnail, code, stock, id}) => {

        const createdProd = new Product({title, description, price, thumbnail, code, stock, id});
        const prods = await this.getProducts();

         if (prods.some((prod) => prod.code == code)) {
            return Error('Invalid code. Existent article')
        } else {
            prods.push(createdProd);
        }

        await fs.promises.writeFile(this.path, JSON.stringify(prods, null, '\t'));
        
    };

    deleteProduct = async(id) => {
        const prods = await this.getProducts();
        const removedItem = prods.find(prod => prod.id == id);
        prods.splice(prods.indexOf(removedItem), 1);

        await fs.promises.writeFile(this.path, JSON.stringify(prods, null, '\t'));
        return prods

    }; 

    getProductbyId = async(id) => {

        const prods = await this.getProducts()
        const selectedProd = prods.find((prod) => prod.id === id)
        
        
        if (!selectedProd) {
            return Error('The item does not exist')
        } else {
            return selectedProd
        }
        
    };

    updateProduct = async(id, modifiedFields) => {
        const prods = await this.getProducts();
        const itemIndex = prods.findIndex((prod) => prod.id === id);
        if (itemIndex === -1) {
            return Error('The article does not exist')
        };

        const modifiedArticle = { ...prods[itemIndex], ...modifiedFields};
        if (modifiedArticle.id !== id) throw new Error('Id numbers are unchangeable');

        const fieldsToChange = ['title', 'price', 'thumbnail', 'code', 'stock'];
        const wrongKeys = Object.keys(modifiedFields).filter(key => !fieldsToChange.includes(key));
        
        if (wrongKeys > 0) {
            throw new Error('Inadmissible updating');
        }

        prods[itemIndex] = modifiedArticle;
        await fs.promises.writeFile(this.path, JSON.stringify(prods, null, '\t'));
        return prods[itemIndex];

    }
}



///////TESTING AREA///////////////////////////////////////////////////////////////



const prodManager = new ProductManager('./products.json');

const checkingMethods = async() => {

        /* try {
            await prodManager.addProduct({title: 'Apple iPhone 13', 
            description: 'Built and Designed by Apple Inc', 
            price: 350000,
            thumbnail: 'none',
            code: 321,
            stock: 10});

            await prodManager.addProduct({title: 'Moto G72', 
            description: 'Made by Motorola', 
            price: 83000,
            thumbnail: 'none',
            code: 124,
            stock: 30});

            await prodManager.addProduct({title: 'Beats Solo3 Headphones', 
            description: 'Wireless Headphones made by Beats by Dr. Dre', 
            price: 238000,
            thumbnail: 'none',
            code: 125,
            stock: 15});

            await prodManager.addProduct({title: 'Galaxy Buds In-Ear Headphones', 
            description: 'Wireless Headphones fabricated and distributed by Samsung', 
            price: 78000,
            thumbnail: 'none',
            code: 120,
            stock: 50})

            console.log(await 'Products saved successfully');
            
        } catch (error) {
            console.log('Test: ', error.message)
        } */


        /* console.log(await prodManager.getProducts()) */
        /* console.log (await prodManager.deleteProduct(2)); */
        /* console.log(await prodManager.getProductbyId(3)); */
        /* console.log(await prodManager.updateProduct(1, {title: 'Apple iPhone 14', 
                                    description: 'Built and designed by Apple', 
                                    price: 315000,
                                    thumbnail: 'image.png',
                                    code: 121, 
                                    stock: 7})) */

    }

checkingMethods(); 
