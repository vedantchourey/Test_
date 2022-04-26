export interface IWallet {
  id: string;
  userId?: string;
  balance?: number;
  last_transaction_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
