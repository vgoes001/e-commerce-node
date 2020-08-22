import { Router, Response, Request } from 'express';
import UsersRepository from '../repositories/UsersRepositories';

const usersRouter = Router();

const usersRepository = new UsersRepository();

usersRouter.get('/', (request: Request, response: Response) => {
  const users = usersRepository.all();
  return response.json(users);
});

usersRouter.post('/', (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  const findUserWithSameName = usersRepository.findByName(name);

  if (findUserWithSameName) {
    return response.status(400).json({ message: 'This name is already used' });
  }

  const user = usersRepository.create({ name, email, password });

  return response.json(user);
});

export default usersRouter;
