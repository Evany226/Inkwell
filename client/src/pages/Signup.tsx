import GoogleButton from "../components/post/buttons/GoogleButton";
import GithubButton from "../components/post/buttons/GithubButton";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { useState } from "react";
import AuthError from "../components/notifications/AuthError";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const createAcc = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password != confirm) {
      alert("Passwords don't match");
    } else {
      console.log("user created");
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);

          const createUserDB = async () => {
            const data = {
              email: user.email,
              uid: user.uid,
            };
            await setDoc(doc(db, "users", user.uid), data);
          };
          createUserDB();

          sendEmailVerification(user);

          navigate("/login");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setErrorMsg(errorMessage);
          // ..
        });
    }
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
        <h2 className="text-2xl font-bold">Create an account</h2>
        <form className="mt-4 space-y-4 " onSubmit={createAcc}>
          <div className="flex flex-col space-y-3">
            <label className="text-sm font-medium">Email Address</label>
            <input
              type="email"
              className="border border-gray-400 px-2 py-2 rounded-md text-sm focus:outline-violet-600 "
              placeholder="name@website.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </div>
          <div className="flex flex-col space-y-3">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="border border-gray-400 px-2 py-2 rounded-md text-sm focus:outline-violet-600 "
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </div>
          <div className="flex flex-col space-y-3">
            <label className="text-sm font-medium">Confirm password</label>
            <input
              type="password"
              className="border border-gray-400 px-2 py-2 rounded-md text-sm focus:outline-violet-600 "
              placeholder="••••••••"
              onChange={(e) => setConfirm(e.target.value)}
              required
            ></input>
          </div>
          <div className="pt-4 pb-0">
            <button
              type="submit"
              className="w-full bg-violet-600 text-white py-1.5 text-sm font-medium rounded-md hover:bg-violet-800"
            >
              Sign up
            </button>
          </div>
        </form>
        <AuthError errorMsg={errorMsg} />
        <div className="flex justify-center pb-6 mt-4">
          <p className="text-black text-sm font-medium">
            Already have an account?{" "}
            <Link to="/login" className="ml-1 text-violet-700 font-semibold">
              Log in
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

export default Signup;
