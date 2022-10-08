import { Router } from "express";
import WalletController from "../controller/wallet";
import AuthMiddleware from "../middleware/auth";

const router = Router();
router.get("/", AuthMiddleware.authorize, WalletController.getDetails);
router.post("/fund", AuthMiddleware.authorize, WalletController.fund);
router.post("/transfer", AuthMiddleware.authorize, WalletController.transfer);
router.post("/withdraw", AuthMiddleware.authorize, WalletController.withdraw);

export { router };
