export interface ITournament {
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
    platform: string;
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
    checkInAmount: number;
    type: "SINGLE" | "DOUBLE";
    thirdPlace: true;
    playersLimit: number;
    rounds: Array<{
      round: string;
      description: string;
      map?: string;
      isMap?: boolean;
    }>;
  };
  streams?: Array<{
    provider: string;
    url: string;
  }>;
  status: "draft" | "published";
  joinStatus: "PRIVATE" | "PUBLIC";
  createTemplateCode: string;
  [extrsProps: string]: any;
}
