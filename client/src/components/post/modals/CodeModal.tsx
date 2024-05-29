import { XCircleIcon } from "@heroicons/react/16/solid";
import { CodeBlock, dracula } from "react-code-blocks";

const CodeModal = ({ setCodeOpen }: { setCodeOpen(arg: boolean): void }) => {
  return (
    <div className="w-full flex flex-wrap">
      <CodeBlock
        text={"Testing Testing"}
        language={"javascript"}
        showLineNumbers={true}
        theme={dracula}
      />
      <XCircleIcon className="w-4" onClick={() => setCodeOpen(false)} />
    </div>
  );
};

export default CodeModal;
