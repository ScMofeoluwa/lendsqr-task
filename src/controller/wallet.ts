import { Request, Response } from "express";
import WalletService from "../service/wallet";
import TransactionService from "../service/transaction";
import UserService from "../service/user";
import PaystackService from "../service/paystack";
import { Status, ITransaction } from "../interface";
import { generate } from "shortid";

class WalletController {
  async getDetails(req: Request, res: Response): Promise<void> {
    try {
      const wallet = await WalletService.getOne(parseInt(req.user.id));
      res.status(200).send({ message: null, data: wallet });
    } catch (err: any) {
      res.status(400).send({ message: err.message, data: null });
    }
  }

  async fund(req: Request, res: Response): Promise<void> {
    try {
      const walletId = req.user.walletId;
      const amount = req.body.amount;
      const data = await PaystackService.initializeTransaction(amount);
      const payload: ITransaction = {
        id: data.txnRef,
        amount: amount,
        wallet_id: walletId,
        destination: walletId,
        type: "deposit",
      };
      await TransactionService.create(payload);
      res.status(200).send({ message: null, data: data });
    } catch (err: any) {
      res.status(400).send({ message: err.message, data: null });
    }
  }

  async transfer(req: Request, res: Response): Promise<void> {
    try {
      const walletId = req.user.walletId;
      const user = await UserService.getOneByUsername(req.body.username);
      const destinationWallet = await WalletService.getOneByUser(user.id);
      const amount = req.body.amount;
      await TransactionService.create({
        id: generate(),
        wallet_id: walletId,
        amount: amount * -1,
        source: walletId,
        destination: destinationWallet.id,
        type: "transfer",
        status: "successful",
      });
      await TransactionService.create({
        id: generate(),
        wallet_id: destinationWallet.id,
        amount: amount,
        source: walletId,
        destination: destinationWallet.id,
        type: "transfer",
        status: "successful",
      });
      res
        .status(200)
        .send({ message: "transfer is being processed", data: null });
    } catch (err: any) {
      res.status(400).send({ message: err.message, data: null });
    }
  }

  async withdraw(req: Request, res: Response): Promise<void> {
    try {
      const bankCode = await PaystackService.getBankCode("Kuda Bank");
      const walletId = req.user.walletId;
      const amount = req.body.amount;
      const recipientCode = await PaystackService.createTransferRecipient({
        name: req.body.name,
        accountNumber: req.body.account,
        bankCode: bankCode,
        reason: req.body.reason,
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
      await TransactionService.create({
        id: generate(),
        wallet_id: walletId,
        amount: amount * -1,
        source: walletId,
        type: "withdrawal",
        status: status,
      });
      res
        .status(200)
        .send({ message: "withdrawal is being processed", data: null });
    } catch (err: any) {
      res.status(400).send({ message: err.message, data: null });
    }
  }
}

export default new WalletController();
