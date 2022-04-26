export interface ITransaction {
  id?: string;
  walletId?: string;
  userId?: string;
  credit?: number;
  debit?: number;
  invoice_no?: string;
  type?: string;
  created_at?: Date;
}
