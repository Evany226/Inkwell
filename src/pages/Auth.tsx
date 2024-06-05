import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

const Auth = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  signInWithRedirect(auth, provider);

  return <div>This is signup page</div>;
};

export default Auth;
