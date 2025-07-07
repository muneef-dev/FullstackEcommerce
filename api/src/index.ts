import dotenv from 'dotenv';
// import express, { Router } from 'express';
import express from 'express';
import productRoutes from './routes/product/index';

dotenv.config();

const port = 3000;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/product', productRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});