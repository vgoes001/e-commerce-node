import User from '../schemas/User';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export default class UsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public all(): User[] {
    return this.users;
  }

  public findByName(name: string): User | undefined {
    const findUser = this.users.find(user => user.name === name);

    return findUser;
  }

  public create({ name, email, password }: CreateUserDTO): User {
    const user = new User({ name, email, password });
    this.users.push(user);
    return user;
  }
}
