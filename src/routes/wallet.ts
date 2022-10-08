import { Router } from "express";
import WalletController from "../controller/wallet";
import AuthMiddleware from "../middleware/auth";
import WalletValidator from "../validators/wallet";
import RequestBodyMiddleware from "../middleware/requestbody";

const router = Router();
router.get("/", AuthMiddleware.authorize, WalletController.getDetails);
router.post(
  "/fund",
  RequestBodyMiddleware.validate(WalletValidator.fund()),
  AuthMiddleware.authorize,
  WalletController.fund,
);
router.post(
  "/transfer",
  RequestBodyMiddleware.validate(WalletValidator.transfer()),
  AuthMiddleware.authorize,
  WalletController.transfer,
);
router.post(
  "/withdraw",
  RequestBodyMiddleware.validate(WalletValidator.withdraw()),
  AuthMiddleware.authorize,
  WalletController.withdraw,
);

export { router };
