export interface Room {
  id: number;
  name: string;
  capacity: number;
  owner: {
    username: string;
    avatar: string;
  };
  type: number;
  onlineUsers: number;
}
