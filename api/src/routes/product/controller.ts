import { Request, Response } from "express"; // node also has Request and Response but dont use that.

// controller responsibility is to specify what happens or how do we handle a request (error handling etc)

export function getProduts(req: Request, res: Response) {
    res.send('getProduts');
}

export function getProductById(req: Request, res: Response) {
    res.send('getProductById');
}

export function createProduct(req: Request, res: Response) {
    console.log(req.body);
    res.send('createProduct');
}

export function updateProduct(req: Request, res: Response) {
    res.send('updateProduct');
}

export function deleteProduct(req: Request, res: Response) {
    res.send('deleteProduct');
}