import { Router, Response, Request } from 'express';

import CreateCategoryService from '../services/CreateCategoryService';

const categoriesRouter = Router();

categoriesRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name } = request.body;

    const createCategory = new CreateCategoryService();

    const category = await createCategory.execute(name);

    return response.json(category);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default categoriesRouter;
