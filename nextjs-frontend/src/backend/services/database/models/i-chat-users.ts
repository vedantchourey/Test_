export interface IChatUsers {
  id: string;
  channel_id: string;
  created_at: string;
  usre_id: string;
  other_user: string;
  channel_name: string;
  channel_type: string;
  updated_at: string;
  last_message: string;
  chat_image?: string;
  type: string;
  unread: boolean;
  last_message_by: string;
}
