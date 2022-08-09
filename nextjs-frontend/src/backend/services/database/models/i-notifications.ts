export interface INotifications {
  id?: string;
  type: string;
  user_id: string;
  is_action_required: boolean;
  status?: string;
  sent_by?: string | null;
  message?: string | null;
  username?: string | null;
  post_id?: string | null;
  data?: {
    tournament_id?: string;
    request_by?: string;
    team_id?: string;
    [key: string]: any;
  };
}
