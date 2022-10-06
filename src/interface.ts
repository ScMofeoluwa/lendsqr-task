export type Data = {
  [key: string]: any;
};

type Type = "deposit" | "withdrawal" | "transfer";

type Status = "pending" | "successful" | "failed";

export interface IResponseData {
  status: number;
  message: string;
  data: Data;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface Wallet {
  id: number;
  balance: number;
  created_at: Date;
  user_id: number;
}

export interface Transaction {
  id?: number;
  wallet_id: number;
  amount: number;
  source?: number;
  destination?: number;
  type: Type;
  status?: Status;
}

export interface IService<T> {
  create(data: Omit<T, "id">): Promise<boolean>;
}
