import { AuthErrorCodes } from "firebase/auth";

export const errorHandle = (errorMessage: string) => {
  if (errorMessage.includes(AuthErrorCodes.INVALID_LOGIN_CREDENTIALS)) {
    return "Incorrect email or password";
  } else {
    return "Something went wrong";
  }
};
