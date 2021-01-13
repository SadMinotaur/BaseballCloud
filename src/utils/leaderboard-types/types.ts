export type PitchingUser = {
  pitcher_name: string;
  velocity: number;
  spin_rate: number;
  age: number;
  pitcher_datraks_id: number;
  pitch_type: string;
  favorite: boolean;
  school: { id: string; name: string };
  teams: { id: string; name: string }[];
};

export type BattingUser = {
  batter_name: string;
  exit_velocity: number;
  launch_angle: number;
  age: number;
  batter_datraks_id: number;
  distance: number;
  favorite: boolean;
  school: { id: string; name: string };
  teams: { id: string; name: string }[];
};
