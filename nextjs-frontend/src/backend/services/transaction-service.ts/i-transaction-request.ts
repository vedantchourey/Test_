export interface ITransactionRequest {
  userId: string;
  wallet_id: string;
  amount: number;
  type: string;
  data?: any;
}
