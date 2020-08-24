import { Router, Response, Request } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateProductService from '../services/CreateProductService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const productsRouter = Router();
const upload = multer(uploadConfig);

productsRouter.use(ensureAuthenticated);

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

productsRouter.patch(
  '/image',
  upload.single('image'),
  async (request, response) => {
    return response.json({ ok: true });
  },
);

export default productsRouter;
