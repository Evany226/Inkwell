const Post = ({ name, time }: { name: string; time: string }) => {
  return (
    <div className="bg-white w-full p-4 flex-col justify-center items-center rounded-lg mt-4 border text-wrap whitespace-break-spaces">
      <div className="text-sm text-gray-400">{time}</div>
      <div className="text-base mt-2 text-black break-words">{name}</div>
    </div>
  );
};

export default Post;
