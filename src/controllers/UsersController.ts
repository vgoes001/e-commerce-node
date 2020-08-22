import { Request, Response } from 'express';

export default class UsersController {
  create(request: Request, response: Response): Response {
    return response.send('Hi there');
  }
}
