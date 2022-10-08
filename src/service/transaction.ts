import TransactionRepository from "../repository/transaction";
import { Transaction, IService } from "../interface";

class TransactionService implements IService<Transaction> {
  async create(data: Partial<Transaction>): Promise<any> {
    return await TransactionRepository.create(data);
  }

  async getByWallet(walletId: number, id: string): Promise<Transaction> {
    const txn = await TransactionRepository.findByWallet(walletId, id);
    if (!txn) {
      throw new Error("transaction not found");
    }
    return txn;
  }

  async getOne(id: string): Promise<Transaction> {
    const txn = await TransactionRepository.findOne(id);
    if (!txn) {
      throw new Error("transaction not found");
    }
    return txn;
  }

  async getAll(walletId: number): Promise<Transaction[]> {
    return await TransactionRepository.findAll(walletId);
  }

  async update(id: string, data: Pick<Transaction, "status">) {
    return await TransactionRepository.update(id, data);
  }
}

export default new TransactionService();
