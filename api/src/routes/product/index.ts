import { Router } from 'express';

// product endpoints
const router = Router();

router.get('/', (req, res)=>{
    res.send('The list of products');
});

router.get('/:id', (req, res)=>{ // :id -> puff parameters
    console.log(req.params);
    res.send('A product');
});

router.post('/', (req, res)=> {
    res.send('New product created');
});

export default router;