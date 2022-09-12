export interface IMatchResultRequest {
    id?: string;
    match_id: number;
    opponent1: IResult
    opponent2: IResult
    screenshot: string;
    tournament_id: string;
}
export interface IResult {
    score: number;
    result: string;
    id?: any;
}