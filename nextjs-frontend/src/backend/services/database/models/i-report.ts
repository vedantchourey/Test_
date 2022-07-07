export interface IReport {
    id?: string;
    post_id: number;
    reported_by: string;
    profiles: any;
    created_at?: Date;
}
