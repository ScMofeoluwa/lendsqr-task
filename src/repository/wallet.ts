import { Knex } from "knex";
import { IWallet } from "../interface";
import { db } from "./index";

class WalletRepository {
  public tableName = "wallets";

  public get _model(): Knex.QueryBuilder {
    return db(this.tableName);
  }

  async create(item: Pick<IWallet, "user_id">): Promise<boolean> {
    const result = await this._model.insert(item);
    return !!result;
  }

  async findByUserId(id: number): Promise<Omit<IWallet, "balance">> {
    return this._model.where("user_id", id).first();
  }

  async findOne(id: number): Promise<IWallet> {
    return this._model.where("id", id).first();
  }

  async getBalance(id: number): Promise<number> {
    const sum = await this._model
      .sum("amount as sum")
      .innerJoin("transactions", "transactions.wallet_id", "wallets.id")
      .where("status", "successful")
      .where("wallets.id", id);
    return sum[0].sum as Promise<number>;
  }
}

export default new WalletRepository();
