type RoomType = 0 | 1;
export interface Room {
  id: number;
  name: string;
  capacity: number;
  description: string;
  type?: RoomType;
  password?: string;
  ownerId?: number;
  owner: {
    username: string;
    avatar: string;
    isFollowing?: boolean;
  };
  onlineUsers: number;
}
export interface RoomForm {
  name: string;
  description: string;
  password_protected: boolean;
  password: string;
}
