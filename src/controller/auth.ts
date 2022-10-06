import { Request, Response } from "express";
import UserService from "../service/user";
import WalletService from "../service/wallet";
import JwtService from "../service/jwt";

class AuthController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      await UserService.create(req.body);
      const user = await UserService.getOneByEmail(req.body.email);
      await WalletService.create({ user_id: user.id });
      res
        .status(201)
        .send({ message: "user successfully created", data: user });
    } catch (err: any) {
      res.status(400).send({ message: err.message, data: null });
    }
  }

  async login(req: Request, res: Response): Promise<any> {
    try {
      const user = await UserService.getOneByEmail(req.body.email);
      const wallet = await WalletService.getOneByUser(user.id);
      const validPassword = UserService.isValidPassword(
        req.body.password,
        user.password,
      );
      if (!validPassword)
        return res
          .status(400)
          .send({ message: "Invalid email or password", data: null });
      const response = {
        accessToken: JwtService.generateAccessToken(user.id, wallet.id),
      };
      console.log(wallet.id);
      res.status(200).send({ message: "login successful", data: response });
    } catch (err: any) {
      res.status(200).send({ message: err.message, data: null });
    }
  }
}

export default new AuthController();
