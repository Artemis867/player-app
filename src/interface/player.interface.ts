export default interface PlayerInfo {
  player_img?: string;
  full_name: string;
  nationality: string;
  status?: "ACTIVE" | "INACTIVE";
  personId?: string;
}