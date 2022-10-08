import { Router } from "express";
import AuthController from "../controller/auth";
import AuthValidator from "../validators/auth";
import RequestBodyMiddleware from "../middleware/requestbody";

const router = Router();
router.post(
  "/register",
  RequestBodyMiddleware.validate(AuthValidator.register()),
  AuthController.create,
);
router.post(
  "/login",
  RequestBodyMiddleware.validate(AuthValidator.login()),
  AuthController.login,
);

export { router };
