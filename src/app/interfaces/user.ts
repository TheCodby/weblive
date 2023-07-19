import { Room } from "./room";

export interface User {
  id: number;
  username: string;
  bio?: string;
  avatar: string;
  admin?: boolean;
  rooms: Room[];
}
