const AuthError = ({ errorMsg }: { errorMsg: string }) => {
  if (errorMsg == "") {
    return null;
  }

  return (
    <div className="flex justify-center mt-2 ease-in duration-300 translate-y-0.5">
      <p className="text-red-600 font-medium">{errorMsg}</p>
    </div>
  );
};

export default AuthError;
