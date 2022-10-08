import WalletRepository from "../repository/wallet";
import { IWallet, IService } from "../interface";

class WalletService implements IService<IWallet> {
  async create(data: Pick<IWallet, "user_id">): Promise<boolean> {
    return await WalletRepository.create(data);
  }

  async getOneByUser(userId: number): Promise<Omit<IWallet, "balance">> {
    const wallet = await WalletRepository.findByUserId(userId);
    if (!wallet) {
      throw new Error("wallet not found");
    }
    return wallet;
  }

  async getOne(id: number): Promise<IWallet> {
    const wallet = await WalletRepository.findOne(id);
    if (!wallet) {
      throw new Error("wallet not found");
    }
    wallet.balance = await WalletRepository.getBalance(id);
    return wallet;
  }
}

export default new WalletService();
