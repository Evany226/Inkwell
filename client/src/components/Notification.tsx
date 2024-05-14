import Alert from "@mui/material/Alert";

const Notification = ({
  message,
  setErrorMsg,
}: {
  message: string;
  setErrorMsg: (val: string) => void;
}) => {
  if (message == "") {
    return null;
  }

  return (
    <Alert
      severity="success"
      className="absolute top-0 right-0 mt-6 mr-6 font-green-500 border border-green-600"
      sx={{
        color: "green",
      }}
      onClose={() => {
        setErrorMsg("");
      }}
    >
      {message}
    </Alert>
  );
};

export default Notification;
