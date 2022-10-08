import { Knex } from "knex";
import { Transaction } from "../interface";
import { db } from "./index";

class TransactionRepository {
  public tableName = "transactions";

  public get _model(): Knex.QueryBuilder {
    return db(this.tableName);
  }

  async create(item: Partial<Transaction>): Promise<void> {
    const trx = await db.transaction();
    try {
      await trx(this.tableName).insert(item);
      await trx.commit();
    } catch (err: any) {
      await trx.rollback(err);
    }
  }

  async findAll(walletId: number): Promise<Transaction[]> {
    return this._model.where("wallet_id", walletId);
  }

  async findByWallet(walletId: number, id: string): Promise<Transaction> {
    return this._model.where("wallet_id", walletId).where("id", id);
  }

  async findOne(id: string): Promise<Transaction> {
    return this._model.where("id", id).first();
  }

  async update(
    id: string,
    item: Pick<Transaction, "status">,
  ): Promise<boolean> {
    const result = await this._model.where("id", id).update(item);
    return !!result;
  }
}

export default new TransactionRepository();
