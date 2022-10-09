type Type = "deposit" | "withdrawal" | "transfer";

export type Status = "pending" | "successful" | "failed" | "reversed";

export type Data = {
  [key: string]: any;
};

export interface IResponseData {
  status: number;
  message: string;
  data: Data;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface IWallet {
  id: number;
  balance: number;
  created_at: Date;
  user_id: number;
}

export interface ITransaction {
  id: string;
  wallet_id: number;
  amount: number;
  source?: number;
  destination?: number;
  type: Type;
  status?: Status;
}
