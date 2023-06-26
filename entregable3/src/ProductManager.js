import fs from 'fs'
/* const fs = require('fs'); */

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

export default class ProductManager { 
    constructor (path){
        this.path = path;
        this.products = [];
    }

    getProducts = async() => {
        if (fs.existsSync(this.path)) {
            const info = await fs.promises.readFile(this.path,'utf-8');
            const prod = JSON.parse(info);
            return prod;
            /* console.log(prod); */
        } else {
            return [];
        }
    };

    addProduct = async({title, description, price, thumbnail, code, stock, id}) => {

        const createdProd = new Product({title, description, price, thumbnail, code, stock, id});
        const prods = await this.getProducts();

         if (prods.some((prod) => prod.code == code)) {
            return Error('Invalid code. Existent article');
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
        const prods =  await this.getProducts();
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



 export const prodManager = new ProductManager('./products.json');

const checkingMethods = async() => {

        /* try {
            await prodManager.addProduct({title: 'Motorola G42', 
            description: 'Smartphone made by Motorola', 
            price: 93000,
            thumbnail: 'none',
            code: 111,
            stock: 45});

            await prodManager.addProduct({title: 'Samsung Galaxy Tab S6 Lite ', 
            description: 'Smartphone fabricated and distributed by Samsung', 
            price: 194000,
            thumbnail: 'none',
            code: 112,
            stock: 39});

            await prodManager.addProduct({title: 'TCL Smartphone 408', 
            description: 'Built and shaped by TCL', 
            price: 53000,
            thumbnail: 'none',
            code: 113,
            stock: 62});

            await prodManager.addProduct({title: 'ZTE Blade V40 Vita', 
            description: 'Provided by ZTE', 
            price: 58500,
            thumbnail: 'none',
            code: 114,
            stock: 28})

            await prodManager.addProduct({title: 'JBL Headphones Vibe 200 TWS', 
            description: 'In-Ear Headphones supplied by JBL', 
            price: 160000,
            thumbnail: 'none',
            code: 115,
            stock: 55})

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
