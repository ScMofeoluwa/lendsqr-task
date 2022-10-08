import { Data } from "./src/interface";

export {};

declare global {
  namespace Express {
    interface Request {
      user: Data;
    }
  }
}
