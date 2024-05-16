import GoogleButton from "../components/post/buttons/GoogleButton";
import GithubButton from "../components/post/buttons/GithubButton";

const Login = () => {
  return (
    <section className="flex flex-col items-center rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] ">
      <img src="../../full-logo.png" className="w-52"></img>
      <div className="flex flex-col w-full h-full bg-white rounded-lg shadow p-8 mt-8">
        <h2 className="text-2xl font-bold">Sign in to your account</h2>
        <form className="mt-4 space-y-4 ">
          <div className="flex flex-col space-y-3">
            <label className="text-sm font-medium">Email Address</label>
            <input
              type="email"
              className="border border-gray-400 px-2 py-2 rounded-md text-sm focus:outline-violet-600 "
              placeholder="name@website.com"
            ></input>
          </div>
          <div className="flex flex-col space-y-3">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="border border-gray-400 px-2 py-2 rounded-md text-sm focus:outline-violet-600 "
              placeholder="••••••••"
            ></input>
          </div>
        </form>
        <div className="pt-8 pb-4">
          <button
            type="submit"
            className="w-full bg-violet-600 text-white py-1.5 text-sm font-medium rounded-md hover:bg-violet-800"
          >
            Log in
          </button>
        </div>
        <div className="flex justify-center pb-6">
          <p className="text-black text-sm font-medium">
            Don't have an account?{" "}
            <a className="ml-1 text-violet-700 font-semibold">Sign up</a>
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
