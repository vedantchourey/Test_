export interface INotifications {
  id?: string;
  type: string;
  user_id: string;
  is_action_required: boolean;
  status?: string;
  data: any;
}
