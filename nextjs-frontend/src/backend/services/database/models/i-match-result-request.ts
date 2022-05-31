export interface IBMatch {
    id: number;
    status: string;
    opponent1: IResult;
    opponent2: IResult;
    screenshot: string;
}

export interface IResult {
    score: number;
    result: string;
}