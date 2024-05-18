import { AuthErrorCodes } from "firebase/auth";

export const errorHandle = (errorMessage: string) => {
  if (errorMessage.includes(AuthErrorCodes.INVALID_LOGIN_CREDENTIALS)) {
    return "Incorrect email or password";
  } else if (
    errorMessage.includes(AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER)
  ) {
    return "Too many attempts try again later or reset password";
  } else {
    return "Something went wrong";
  }
};
