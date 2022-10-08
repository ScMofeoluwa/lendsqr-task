import TransactionRepository from "../repository/transaction";
import { ITransaction, IService } from "../interface";

class TransactionService implements IService<ITransaction> {
  async create(data: Partial<ITransaction>): Promise<any> {
    return await TransactionRepository.create(data);
  }

  async getByWallet(walletId: number, id: string): Promise<ITransaction> {
    const txn = await TransactionRepository.findByWallet(walletId, id);
    if (!txn) {
      throw new Error("transaction not found");
    }
    return txn;
  }

  async getOne(id: string): Promise<ITransaction> {
    const txn = await TransactionRepository.findOne(id);
    if (!txn) {
      throw new Error("transaction not found");
    }
    return txn;
  }

  async getAll(walletId: number): Promise<ITransaction[]> {
    return await TransactionRepository.findAll(walletId);
  }

  async update(id: string, data: Pick<ITransaction, "status">) {
    return await TransactionRepository.update(id, data);
  }
}

export default new TransactionService();
