import { Request, Response } from "express";
import TransactionService from "../service/transaction";
import { createHmac } from "crypto";
import { configuration } from "../config/config";

class TransactionController {
  async getOne(req: Request, res: Response): Promise<any> {
    try {
      //@ts-ignore
      const walletId = req.user.walletId;
      const txn = await TransactionService.getByWallet(walletId, req.params.id);
      res.status(200).send({ message: null, data: txn });
    } catch (err: any) {
      res.status(400).send({ message: err.message, data: null });
    }
  }

  async getAll(req: Request, res: Response): Promise<any> {
    //@ts-ignore
    const walletId = req.user.walletId;
    const txns = await TransactionService.getAll(walletId);
    res.status(200).send({ message: null, data: txns });
  }

  async webhook(req: Request, res: Response): Promise<void> {
    const hash = createHmac("sha512", configuration.paystackSecret)
      .update(JSON.stringify(req.body))
      .digest("hex");
    if (hash == req.headers["x-paystack-signature"]) {
      const event = req.body;
      const txnRef = event.data.reference;
      const txn = await TransactionService.getOne(txnRef);
      if (event.event === "charge.success") {
        await TransactionService.update(txn.id, { status: "successful" });
      }
      if (event.event === "charge.failed") {
        await TransactionService.update(txn.id, { status: "failed" });
      }

      //handle webhook for paystack withdrawal

      // if (event.event === "transfer.success") {
      //   await TransactionService.update(txn.id, { status: "successful" });
      // }
      // if (event.event === "transfer.failed") {
      //   await TransactionService.update(txn.id, { status: "failed" });
      // }
      // if (event.event === "transfer.reversed") {
      //   await TransactionService.update(txn.id, { status: "reversed" });
      // }
    }
    res.sendStatus(200);
  }
}

export default new TransactionController();
