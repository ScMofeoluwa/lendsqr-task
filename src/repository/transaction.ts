import { Knex } from "knex";
import { ITransaction } from "../interface";
import { db } from "./index";

class TransactionRepository {
  public tableName = "transactions";

  public get _model(): Knex.QueryBuilder {
    return db(this.tableName);
  }

  async create(item: Partial<ITransaction>): Promise<void> {
    return this._model.insert(item);
  }

  async findAll(walletId: number): Promise<ITransaction[]> {
    return this._model.where("wallet_id", walletId);
  }

  async findByWallet(walletId: number, id: string): Promise<ITransaction> {
    return this._model.where("wallet_id", walletId).where("id", id).first();
  }

  async findOne(id: string): Promise<ITransaction> {
    return this._model.where("id", id).first();
  }

  async update(
    id: string,
    item: Pick<ITransaction, "status">,
  ): Promise<boolean> {
    const result = await this._model.where("id", id).update(item);
    return !!result;
  }
}

export default new TransactionRepository();
