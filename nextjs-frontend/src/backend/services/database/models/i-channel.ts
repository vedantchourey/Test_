export interface IChannel {
  id: string;
  owner: string;
  created_at: string;
  is_deleted: boolean;
  type: "one-to-one" | "team";
}
