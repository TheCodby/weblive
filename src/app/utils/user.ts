import * as jwt from "jsonwebtoken";
export const isLoggedin = async (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) ? true : false;
  } catch (err) {
    return false;
  }
};
