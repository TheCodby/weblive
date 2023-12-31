import { Room } from "./room";

export interface User {
  id: number;
  username: string;
  email?: string;
  bio?: string;
  avatar: string;
  admin?: boolean;
  rooms: Room[];
  isFollowing?: boolean;
  verified?: boolean;
  completed?: boolean;
  followers?: number;
  public: boolean;
}
export interface IAuth {
  username: string;
  password: string;
}
export interface IRegister extends IAuth {
  email: string;
}
