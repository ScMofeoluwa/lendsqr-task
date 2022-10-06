import { Request, Response, NextFunction } from "express";
import JwtService from "../service/jwt";
import { configuration } from "../config/config";

class AuthMiddleware {
  authorize(req: Request, res: Response, next: NextFunction) {
    const header: any = req.header("Authorization");
    if (!header) {
      return res.status(401).send({ message: "No bearer token provided" });
    }
    const token = header.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .send({ message: "Access Denied: No token provided" });
    try {
      //@ts-ignore
      req.user = JwtService.validateToken(token, configuration.secret);
      next();
    } catch (ex) {
      res.status(400).send({ message: "Invalid token" });
    }
  }
}

export default new AuthMiddleware();
