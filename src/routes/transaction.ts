import { Router } from "express";
import TransactionController from "../controller/transaction";
import AuthMiddleware from "../middleware/auth";

const router = Router();
router.get("/:id", AuthMiddleware.authorize, TransactionController.getOne);
router.get("/", AuthMiddleware.authorize, TransactionController.getAll);
router.post("/webhook", TransactionController.webhook);

export { router };
