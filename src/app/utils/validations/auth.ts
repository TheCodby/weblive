import * as Yup from "yup";
export const authSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username length should be at least 3 characters")
    .max(32, "Username cannot exceed more than 32 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password length should be at least 6 characters")
    .max(32, "Password cannot exceed more than 32 characters"),
});
