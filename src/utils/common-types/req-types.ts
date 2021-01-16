export type School = { id: string; name: string };
export type Team = { id: string; name: string };
export type Facilities = {
  id: number;
  u_name: string;
  email: string;
};
export type Options = { value: string; label: string };
export interface SignInResp {
  id: number;
  email: string;
  role: string;
}
