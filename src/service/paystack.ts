import axios, { AxiosInstance } from "axios";
import { IResponseData, Data } from "../interface";
import { v4 as uuidv4 } from "uuid";
import { configuration } from "../config/config";

export class PaystackService {
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
    return uuidv4();
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

  async verifyTransaction(reference: string) {
    const { data } = await this.axios.get<IResponseData>(
      `transaction/verify/${reference}`,
    );
    return data;
  }

  async createTransferRecipient(payload: Data) {
    const { data } = await this.axios.post<IResponseData>(
      "/transferrecipient",
      payload,
    );
    return data.data["recipient_code"];
  }

  async initiateTransfer(payload: Data) {
    const { data } = await this.axios.post<IResponseData>("/transfer", payload);
    return data.data["transfer_code"];
  }

  async finalizeTransfer(code: string) {
    const { data } = await this.axios.post<IResponseData>(
      "/transfer/finalize",
      code,
    );
    return data;
  }
}

export default new PaystackService();
