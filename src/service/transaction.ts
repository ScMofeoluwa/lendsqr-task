import TransactionRepository from "../repository/transaction";
import { ITransaction } from "../interface";
import { errorHandler } from "./index";

class TransactionService {
  async create(data: Partial<ITransaction>): Promise<any> {
    return await TransactionRepository.create(data);
  }

  async getByWallet(walletId: number, id: string): Promise<ITransaction> {
    const txn = await TransactionRepository.findByWallet(walletId, id);
    if (!txn) {
      errorHandler("transaction not found", 404);
    }
    return txn;
  }

  async getOne(id: string): Promise<ITransaction> {
    const txn = await TransactionRepository.findOne(id);
    if (!txn) {
      errorHandler("transaction not found", 404);
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
