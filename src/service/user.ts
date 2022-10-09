import UserRepository from "../repository/user";
import { IUser, Data } from "../interface";
import { genSalt, hash, compare } from "bcryptjs";
import { errorHandler } from "./index";
import WalletService from "./wallet";
import JwtService from "./jwt";

class UserService {
  async create(data: Omit<IUser, "id">): Promise<IUser> {
    let user = await UserRepository.findByEmail(data.email);
    if (user) {
      errorHandler("user already exists", 400);
    }
    data.password = await this.hashPassword(data.password);
    await UserRepository.create(data);
    user = await this.getOneByEmail(data.email);
    await WalletService.create({ user_id: user.id });
    return user;
  }

  async getOneByEmail(email: string): Promise<IUser> {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      errorHandler("user not found", 404);
    }
    return user;
  }

  async getOneByUsername(username: string): Promise<IUser> {
    const user = await UserRepository.findByUsername(username);
    if (!user) {
      errorHandler("user not found", 404);
    }
    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }

  async isValidPassword(
    userGivenPassword: string,
    savedPassword: string,
  ): Promise<boolean> {
    return await compare(userGivenPassword, savedPassword);
  }

  async login(data: Pick<IUser, "email" | "password">): Promise<Data> {
    const user = await this.getOneByEmail(data.email);
    const validPassword = await this.isValidPassword(
      data.password,
      user.password,
    );
    if (!validPassword) {
      errorHandler("Invalid email or password", 400);
    }
    const wallet = await WalletService.getOneByUser(user.id);
    return {
      accessToken: JwtService.generateAccessToken(user.id, wallet.id),
    };
  }
}

export default new UserService();
