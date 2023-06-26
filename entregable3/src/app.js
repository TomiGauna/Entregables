import ProductManager from './ProductManager.js';
import express from 'express';

const app = express();
const prodManager = new ProductManager('./products.json');

const listeningPort = 8080;

app.get('/products', async(req, res) => {
    const products = await prodManager.getProducts();
    let limit = req.query.limit;
    let newArray = products.slice(0, limit);

    if (!limit) {
        res.send({products});
    } else {
        limit > 15 ? res.send({Error:'There are only 15 existing items'}) : res.send(newArray);
    }
    
})

app.get('/products/:pId', async(req, res) => {
    const prods = await prodManager.getProducts();

    let pId = req.params.pId;
    const prod = prods.find((p) => p.id == pId);

    if (!prod) {
        return res.send({Error: 'Article Not Found'})
    } else {
        res.send({prod});
    }

})


app.listen(listeningPort, () => {
    console.log(`Server working in port ${listeningPort}`)
})