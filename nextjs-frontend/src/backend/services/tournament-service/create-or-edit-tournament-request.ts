import { TournamentType } from "./tournament-type";

export interface CreateOrEditTournamentType {
  id?: string;
  name: string;
  game: string;
  startDate: Date;
  startTime: Date;
  about: string;
  banner: string;
  info?: {
    contactOption: string;
    contactUrl: string;
    contactDetails: string;
    rules: string;
    prizes: string;
  };
  settings?: {
    server: string;
    plateform: string;
    tournamentFormat: string;
    entryType: string;
    entryFeeAmount: string;
    checkInType: string;
    checkInStartTime: string;
    ScoreReporting: "ADMIN" | "ADMIN_PLAYER";
    screenShots: "NOT_REQUIRED" | "REQUIRED";
    limitType: "LIMITED" | "UNLIMITED";
    limit?: number;
    countryFlagOnBrackets: boolean;
    registrationRegion: "all";
  };
  bracketsMetadata?: {
    name: string;
    startDate: Date;
    startTime: Date;
    checkInType: boolean;
    checkInAmount: 12;
    type: "SINGLE" | "DOUBLE";
    thirdPlace: true;
    playersLimit: number;
    rounds: Array<{
      round: string;
      description: string;
    }>;
  };
  streams?: Array<{
    provider: string;
    url: string;
  }>;
  status: "DRAFT" | "PUBLISHED";
  joinStatus: "PRIVATE" | "PUBLIC";
  createTemplateCode: string;
}
export interface CreateOrEditTournamentRequest {
  id?: string;
  tournamentName: string;
  gameId: string;
  mapId: string;
  platformId: string;
  bestOfId: string;
  formatId: string;
  rules: string;
  isTeamParticipating: boolean;
  numberOfParticipants: number;
  tournamentType: TournamentType;
  scheduleDate: string;
}
