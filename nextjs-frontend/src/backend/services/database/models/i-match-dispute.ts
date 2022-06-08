export interface IMatchDispute {
    id?: string;
    tournamentId: string;
    matchId: string;
    status: string;
    reportedBy: string;
    createdAt?: Date,
    updatedAt?: Date
}