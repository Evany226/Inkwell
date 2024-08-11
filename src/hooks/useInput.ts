import { useState, useMemo } from "react";

type InputHandlers = {
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  resetInput: () => void;
  setValue: (value: string) => void;
};

export function useInput(): [string, InputHandlers] {
  const [state, setState] = useState<string>("");

  const handlers = useMemo(
    () => ({
      handleChange: (
        e:
          | React.ChangeEvent<HTMLInputElement>
          | React.ChangeEvent<HTMLTextAreaElement>
      ) => {
        setState(e.target.value);
      },
      resetInput: () => {
        setState("");
      },
      setValue: (value: string) => {
        setState(value); // Directly set the state
      },
    }),
    []
  );

  return [state, handlers];
}
