import express from "express";
import { router as authRouter } from "./routes/auth";
import { router as walletRouter } from "./routes/wallet";
import { router as transactionRouter } from "./routes/transaction";
import { configuration } from "./config/config";

const app = express();
const port = configuration.app_port;

app.use(express.json());
app.use("/auth", authRouter);
app.use("/wallet", walletRouter);
app.use("/transactions", transactionRouter);

app.listen(port, () => {
  console.log(`Connected to port:${port}`);
});

//TODO: Find where I used type ignore
//TODO: Message Queue for the webhook? 🤔
