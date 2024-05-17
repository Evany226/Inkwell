const AuthError = ({ errorMsg }: { errorMsg: string }) => {
  if (errorMsg == "") {
    return null;
  }

  return (
    <div className="flex justify-center mt-2">
      <p className="text-red-600 font-medium">{errorMsg}</p>
    </div>
  );
};

export default AuthError;
