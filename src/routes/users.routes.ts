import { Router, Response, Request } from 'express';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepositories';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.get('/', (request: Request, response: Response) => {
  const usersRepository = getCustomRepository(UsersRepository);
  const users = usersRepository.find();
  return response.json(users);
});

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
