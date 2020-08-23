import { Router, Response, Request } from 'express';

import CreateProductService from '../services/CreateProductService';

const productsRouter = Router();

productsRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name, description, price, category_id } = request.body;

    const parsedPrice = parseFloat(price);
    const createProduct = new CreateProductService();
    const product = await createProduct.execute({
      name,
      description,
      price: parsedPrice,
      category_id,
    });

    return response.json(product);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default productsRouter;
