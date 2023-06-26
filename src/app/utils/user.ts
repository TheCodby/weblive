import * as jwt from "jsonwebtoken";

export const getUserByToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (err) {
    return false;
  }
};
export const decodeToken: any = (token: string) => {
  try {
    return jwt.decode(token);
  } catch (err) {
    return false;
  }
};
