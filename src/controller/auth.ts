import { Request, Response } from "express";
import UserService from "../service/user";

class AuthController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.create(req.body);
      res
        .status(201)
        .send({ message: "user successfully created", data: user });
    } catch (err: any) {
      const status = err.status ? err.status : 400;
      res.status(status).send({ message: err.message, data: null });
    }
  }

  async login(req: Request, res: Response): Promise<any> {
    try {
      const response = await UserService.login(req.body);
      res.status(200).send({ message: "login successful", data: response });
    } catch (err: any) {
      const status = err.status ? err.status : 400;
      res.status(status).send({ message: err.message, data: null });
    }
  }
}

export default new AuthController();
