export interface Room {
  id: string;
  name: string;
  description: string;
  password?: string;
  ownerId: number;
}
