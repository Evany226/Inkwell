import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";

const Post = ({ name, time }: { name: string; time: string }) => {
  return (
    <div className="bg-white w-full p-4 flex-col justify-center items-center rounded-lg mt-4 border text-wrap whitespace-break-spaces relative">
      <div className="text-sm text-gray-400">{time}</div>
      <div className="text-base mt-2 text-black break-words">{name}</div>
      <div className="absolute top-0 right-0 cursor-pointer mr-2 mt-4">
        <EllipsisVerticalIcon className="w-4 text-gray-600" />
      </div>
    </div>
  );
};

export default Post;
