import { getRepository } from 'typeorm';
import Category from '../models/Category';

class CreateCategoryService {
  public async execute(name: string): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    const checkCategoryExists = await categoriesRepository.findOne({
      where: { name },
    });

    if (checkCategoryExists) {
      throw new Error('Category already exists');
    }

    const category = categoriesRepository.create({ name });

    await categoriesRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
