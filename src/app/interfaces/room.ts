export interface Room {
  id: number;
  name: string;
  capacity: number;
  ownerId?: number;
  owner: {
    username: string;
    avatar: string;
  };
  type: number;
  onlineUsers: number;
}
