import { useState, useMemo } from "react";

export default function useToggle() {
  const [state, setState] = useState<string>();

  const handlers = useMemo(
    () => ({
      handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value);
      },
      resetInput: () => {
        setState("");
      },
    }),
    []
  );

  return [state, handlers];
}
