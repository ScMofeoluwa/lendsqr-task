import UserService from "../src/service/user";
import { faker } from "@faker-js/faker";
import WalletService from "../src/service/wallet";
import JwtService from "../src/service/jwt";
import { generate } from "shortid";
import { ITransaction } from "../src/interface";
import TransactionService from "../src/service/transaction";

class Helper {
  async getDetails() {
    const payload = {
      username: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const user = await UserService.create(payload);
    const wallet = await WalletService.getOneByUser(user.id);
    const token = JwtService.generateAccessToken(user.id, wallet.id);
    return { wallet, token };
  }

  async getFundedAccount() {
    const { wallet, token } = await this.getDetails();
    const txn: ITransaction = {
      id: generate(),
      amount: 10000,
      wallet_id: wallet.id,
      destination: wallet.id,
      type: "deposit",
      status: "successful",
    };
    await TransactionService.create(txn);
    return token;
  }
}

export default new Helper();
