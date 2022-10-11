import WalletRepository from "../repository/wallet";
import { Data, ITransaction, IWallet, Status } from "../interface";
import PaystackService from "./paystack";
import UserService from "./user";
import { generate } from "shortid";
import { db } from "../repository";
import { errorHandler } from "./index";

class WalletService {
  async create(data: Pick<IWallet, "user_id">): Promise<boolean> {
    return await WalletRepository.create(data);
  }

  async getOneByUser(userId: number): Promise<Omit<IWallet, "balance">> {
    const wallet = await WalletRepository.findByUserId(userId);
    if (!wallet) {
      errorHandler("wallet not found", 404);
    }
    return wallet;
  }

  async getOne(id: number): Promise<IWallet> {
    const wallet = await WalletRepository.findOne(id);
    if (!wallet) {
      errorHandler("wallet not found", 404);
    }
    wallet.balance = await WalletRepository.getBalance(id);
    return wallet;
  }

  async fund(walletId: number, amount: number): Promise<any> {
    const trx = await db.transaction();
    const payload = await PaystackService.initializeTransaction(amount);
    try {
      const txn: ITransaction = {
        id: payload.txnRef,
        amount: amount,
        wallet_id: walletId,
        destination: walletId,
        type: "deposit",
      };
      await trx("transactions").insert(txn);
      await trx.commit();
      return payload;
    } catch (err: any) {
      await trx.rollback(err);
    }
  }

  async withdraw(walletId: number, data: Data): Promise<any> {
    const trx = await db.transaction();
    const bankCode = await PaystackService.getBankCode(data.bank);
    const amount = data.amount;
    const recipientCode = await PaystackService.createTransferRecipient({
      accountNumber: data.account,
      name: data.name,
      reason: data.reason,
      bankCode: bankCode,
    });

    // const transferCode = await PaystackService.initiateTransfer({
    //   amount: amount,
    //   recipient: recipientCode,
    // });
    // await PaystackService.finalizeTransfer(transferCode);

    //could not initiate paystack transfer due to business type of my account
    //randomly generating transaction status, by default status is pending and final status is handled by a webhook
    const statusType = ["successful", "failed", "reversed"];
    const status = statusType[
      Math.floor(Math.random() * 11) % statusType.length
    ] as Status;
    const walletBalance = await WalletRepository.getBalance(walletId);
    if (walletBalance < amount) {
      errorHandler("insufficient balance", 400);
    }
    try {
      const txn: ITransaction = {
        id: generate(),
        wallet_id: walletId,
        amount: amount * -1,
        source: walletId,
        type: "withdrawal",
        status: status,
      };
      await trx("transactions").insert(txn);
      await trx.commit();
    } catch (err: any) {
      await trx.rollback(err);
    }
  }

  async transfer(walletId: number, data: Data): Promise<any> {
    const trx = await db.transaction();
    const user = await UserService.getOneByUsername(data.username);
    const walletBalance = await WalletRepository.getBalance(walletId);
    const destinationWallet = await this.getOneByUser(user.id);
    const amount = data.amount;
    if (walletBalance < amount) {
      errorHandler("insufficient balance", 400);
    }
    try {
      const txn1: ITransaction = {
        id: generate(),
        wallet_id: walletId,
        amount: amount * -1,
        source: walletId,
        destination: destinationWallet.id,
        type: "transfer",
        status: "successful",
      };
      const txn2: ITransaction = {
        id: generate(),
        wallet_id: destinationWallet.id,
        amount: amount,
        source: walletId,
        destination: destinationWallet.id,
        type: "transfer",
        status: "successful",
      };
      await trx("transactions").insert(txn1);
      await trx("transactions").insert(txn2);
      await trx.commit();
    } catch (err: any) {
      await trx.rollback(err);
    }
  }
}

export default new WalletService();
