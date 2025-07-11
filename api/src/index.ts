import dotenv from 'dotenv';
// import express, { Router } from 'express';
import express, { json, urlencoded } from 'express';
import productRoutes from './routes/product/index.js';
import orderRoutes from './routes/order/index.js'
import authRoutes from './routes/auth/index.js';

dotenv.config();

const port = 3000;
const app = express();

// adding middlewares
app.use(urlencoded({extended: false}))
app.use(json()); // it is a middleware helps to convert to json without this we cannot decode the body because its encoded

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/product', productRoutes);
app.use('/auth', authRoutes)
app.use('/order', orderRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});