import { EntityRepository, Repository } from 'typeorm';
import User from '../models/User';

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | undefined> {
    const findUser = await this.findOne({ where: { name } });
    return findUser;
  }
}
