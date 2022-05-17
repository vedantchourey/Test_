export interface IMatchResultRequest {
    match_id: number;
    opponent1: IResult
    opponent2: IResult
}
export interface IResult {
    score: number;
    result: string;
}