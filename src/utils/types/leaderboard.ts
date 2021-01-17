import { School, Team } from "./req-types";

export type PitchingUser = {
  pitcher_name: string;
  velocity: number;
  spin_rate: number;
  age: number;
  pitcher_datraks_id: number;
  pitch_type: string;
  favorite: boolean;
  school: School;
  teams: Team[];
};

export type BattingUser = {
  batter_name: string;
  exit_velocity: number;
  launch_angle: number;
  age: number;
  batter_datraks_id: number;
  distance: number;
  favorite: boolean;
  school: School;
  teams: Team[];
};

export type GetBatting = {
  leaderboard_batting: { leaderboard_batting: BattingUser[] };
};

export type GetPitching = {
  leaderboard_pitching: { leaderboard_pitching: PitchingUser[] };
};
