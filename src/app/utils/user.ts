import * as jwt from "jsonwebtoken";
export const decodeToken: any = (token: string) => {
  try {
    return jwt.decode(token);
  } catch (err) {
    return false;
  }
};
