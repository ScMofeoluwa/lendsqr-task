import UserRepository from "../repository/user";
import { User, IService } from "../interface";
import { genSalt, hash, compare } from "bcryptjs";

class UserService implements IService<User> {
  async create(data: Omit<User, "id">): Promise<boolean> {
    let user = await UserRepository.findByEmail(data.email);
    if (user) {
      throw new Error("user already exists.");
    }
    data.password = await this.hashPassword(data.password);
    return await UserRepository.create(data);
  }

  async getOneByEmail(email: string): Promise<User> {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error("user not found");
    }
    return user;
  }

  async getOneByUsername(username: string): Promise<User> {
    const user = await UserRepository.findByUsername(username);
    if (!user) {
      throw new Error("user not found");
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
}

export default new UserService();
