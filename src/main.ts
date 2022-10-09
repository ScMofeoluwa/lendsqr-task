import express from "express";
import { router as authRouter } from "./routes/auth";
import { router as walletRouter } from "./routes/wallet";
import { router as transactionRouter } from "./routes/transaction";

const app = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/wallet", walletRouter);
app.use("/transactions", transactionRouter);

export { app };
