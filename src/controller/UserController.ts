import { Request, Response } from 'express';
import { UserInputDTO, LoginInputDTO } from '../model/User';
import { UserBusiness } from '../business/UserBusiness';
import { BaseDatabase } from '../data/BaseDatabase';
import { UserDatabase } from '../data/UserDatabase';
import { IdGenerator } from '../services/IdGenerator';
import { HashManager } from '../services/HashManager';
import { Authenticator } from '../services/Authenticator';

export class UserController {
  private static userBusiness = new UserBusiness(
    new UserDatabase(),
    new IdGenerator(),
    new HashManager(),
    new Authenticator(),
  );

  async signup(req: Request, res: Response) {
    try {
      const input: UserInputDTO = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        nickname: req.body.nickname,
      };

      const userData = await UserController.userBusiness.createUser(input);

      res.status(200).send({ userData });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const loginData: LoginInputDTO = {
        email: req.body.email,
        password: req.body.password,
      };

      const userData = await UserController.userBusiness.getUserByEmail(
        loginData,
      );

      res.status(200).send({ userData });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}
