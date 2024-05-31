import GoogleButton from "../components/post/buttons/GoogleButton";
import GithubButton from "../components/post/buttons/GithubButton";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import AuthError from "../components/notifications/AuthError";
import { errorHandle } from "../config/errorHandle";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onLogin = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user.emailVerified) {
          navigate("/dashboard");
        } else {
          setErrorMsg("Email not verified, please check your email");
          setTimeout(() => {
            setErrorMsg("");
          }, 5000);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setErrorMsg(errorHandle(errorMessage));
        setTimeout(() => {
          setErrorMsg("");
        }, 5000);
      });
  };

  return (
    <section className="flex flex-col items-center rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] ">
      <div className="flex items-center">
        <div className="w-20 h-20">
          <img className="w-full h-auto" src="../../logo-clear.png"></img>
        </div>
        <h1 className="text-6xl font-bold font-DancingScript ml-2">Inkwell</h1>
      </div>
      <div className="flex flex-col w-full h-full bg-white rounded-lg shadow p-8 mt-8">
        <h2 className="text-2xl font-bold">Sign in to your account</h2>
        <form className="mt-4 space-y-4" onSubmit={onLogin}>
          <div className="flex flex-col space-y-3">
            <label className="text-sm font-medium">Email Address</label>
            <input
              type="email"
              className="border border-gray-400 px-2 py-2 rounded-md text-sm focus:outline-violet-600 "
              placeholder="name@website.com"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col space-y-3">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="border border-gray-400 px-2 py-2 rounded-md text-sm focus:outline-violet-600 "
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <AuthError errorMsg={errorMsg} />
          <div className="pt-1 pb">
            <button
              type="submit"
              className="w-full bg-violet-600 text-white py-1.5 text-sm font-medium rounded-md hover:bg-violet-800"
            >
              Log in
            </button>
          </div>
        </form>
        <div className="flex justify-center pb-6 mt-4">
          <p className="text-black text-sm font-medium">
            Don't have an account?{" "}
            <Link to="/signup" className="ml-1 text-violet-700 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
        <div className="fter:h-px flex items-center before:h-px before:flex-1  before:bg-gray-300 before:content-[''] after:h-px after:flex-1 after:bg-gray-300  after:content-['']">
          <p className="text-sm px-3 font-medium">Or continue with </p>
        </div>
        <div className="flex mt-4 justify-center space-x-4">
          <GoogleButton />
          <GithubButton />
        </div>
      </div>
    </section>
  );
};

export default Login;
