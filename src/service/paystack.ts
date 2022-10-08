import axios, { AxiosInstance } from "axios";
import { IResponseData, Data } from "../interface";
import { generate } from "shortid";
import { configuration } from "../config/config";

class PaystackService {
  private readonly axios: AxiosInstance;
  constructor() {
    this.axios = axios.create({
      baseURL: configuration.baseUrl,
      timeout: parseInt(configuration.timeout),
      headers: {
        Authorization: `Bearer ${configuration.paystackSecret}`,
      },
    });
  }

  generateTxnReference() {
    return generate();
  }

  async initializeTransaction(payload: Data) {
    const reference = this.generateTxnReference();
    const { data } = await this.axios.post<IResponseData>(
      "/transaction/initialize",
      {
        email: payload.email,
        amount: payload.amount * 100,
        reference: reference,
      },
    );
    return {
      authorization_url: data.data["authorization_url"],
      txnRef: reference,
    };
  }

  async createTransferRecipient(payload: Data) {
    const { data } = await this.axios.post<IResponseData>(
      "/transferrecipient",
      {
        type: "nuban",
        currency: "NGN",
        account_number: payload.accountNumber,
        bank_code: payload.bankCode,
        name: payload.name,
      },
    );
    return data.data["recipient_code"];
  }

  async initiateTransfer(payload: Data) {
    const reference = this.generateTxnReference();
    const { data } = await this.axios.post<IResponseData>("/transfer", {
      source: "balance",
      amount: payload.amount * 100,
      reference: reference,
      reason: payload.reason,
    });
    return data.data["transfer_code"];
  }

  async finalizeTransfer(code: string) {
    const { data } = await this.axios.post<IResponseData>(
      "/transfer/finalize",
      code,
    );
    return data;
  }

  async getBankCode(bankName: string) {
    const { data } = await this.axios.get<IResponseData>("/bank");
    return data.data.find((bank: any) => bank.name === bankName).code;
  }
}

export default new PaystackService();
