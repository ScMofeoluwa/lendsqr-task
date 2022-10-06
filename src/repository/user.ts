import { Knex } from "knex";
import { User } from "../interface";
import { db } from "./index";

class UserRepository {
  public tableName = "users";

  public get _model(): Knex.QueryBuilder {
    return db(this.tableName);
  }

  async create(item: Omit<User, "id">): Promise<boolean> {
    const result = await this._model.insert(item);
    return !!result;
  }

  async findByEmail(email: string): Promise<User> {
    return this._model.where("email", email).first();
  }
}

export default new UserRepository();
