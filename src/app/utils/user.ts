import * as jwt from "jsonwebtoken";
export const getUserByToken = async (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (err) {
    return false;
  }
};
