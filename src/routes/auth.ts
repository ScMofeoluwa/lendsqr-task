import { Router } from "express";
import AuthController from "../controller/auth";

const router = Router();
router.post("/register", AuthController.create);
router.post("/login", AuthController.login);

export { router };
