import { getRepository } from 'typeorm';
import Product from '../models/Product';

interface Request {
  name: string;
  description: string;
  price: number;
  category_id: string;
}

class CreateProductService {
  public async execute({
    name,
    description,
    price,
    category_id,
  }: Request): Promise<Product> {
    const productsRepository = getRepository(Product);

    const checkProductExists = await productsRepository.findOne({
      where: { name },
    });

    if (checkProductExists) {
      throw new Error('Product already exists');
    }

    const product = productsRepository.create({
      name,
      description,
      price,
      category_id,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
