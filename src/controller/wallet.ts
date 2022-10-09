import { Request, Response } from "express";
import WalletService from "../service/wallet";

class WalletController {
  async getDetails(req: Request, res: Response): Promise<void> {
    try {
      const wallet = await WalletService.getOne(req.user.walletId);
      res.status(200).send({ message: null, data: wallet });
    } catch (err: any) {
      const status = err.status ? err.status : 400;
      res.status(status).send({ message: err.message, data: null });
    }
  }

  async fund(req: Request, res: Response): Promise<void> {
    try {
      const walletId = req.user.walletId;
      const amount = req.body.amount;
      const data = await WalletService.fund(walletId, amount);
      res.status(200).send({ message: null, data: data });
    } catch (err: any) {
      const status = err.status ? err.status : 400;
      res.status(status).send({ message: err.message, data: null });
    }
  }

  async transfer(req: Request, res: Response): Promise<any> {
    try {
      const walletId = req.user.walletId;
      await WalletService.transfer(walletId, req.body);
      res
        .status(200)
        .send({ message: "transfer is being processed", data: null });
    } catch (err: any) {
      const status = err.status ? err.status : 400;
      res.status(status).send({ message: err.message, data: null });
    }
  }

  async withdraw(req: Request, res: Response): Promise<void> {
    try {
      const walletId = req.user.walletId;
      await WalletService.withdraw(walletId, req.body);
      res
        .status(200)
        .send({ message: "withdrawal is being processed", data: null });
    } catch (err: any) {
      const status = err.status ? err.status : 400;
      res.status(status).send({ message: err.message, data: null });
    }
  }
}

export default new WalletController();
