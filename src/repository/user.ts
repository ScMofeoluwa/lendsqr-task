import { Knex } from "knex";
import { IUser } from "../interface";
import { db } from "./index";

class UserRepository {
  public tableName = "users";

  public get _model(): Knex.QueryBuilder {
    return db(this.tableName);
  }

  async create(item: Omit<IUser, "id">): Promise<boolean> {
    const result = await this._model.insert(item);
    return !!result;
  }

  async findByEmail(email: string): Promise<IUser> {
    return this._model.where("email", email).first();
  }

  async findByUsername(username: string): Promise<IUser> {
    return this._model.where("username", username).first();
  }
}

export default new UserRepository();
