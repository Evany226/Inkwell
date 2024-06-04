import { PlusIcon, PhotoIcon } from "@heroicons/react/24/outline";

const PhotoButton = () => {
  return (
    <div className="relative group transition-all ml-2 ">
      <PhotoIcon className="w-6 text-gray-600 mb-1" />
      <span className="group-hover:flex hover:bg-gray-200 hidden fixed flex items-center bg-white py-1 px-3 rounded-md border border-gray-400 shadow-md shadow-gray-300 cursor-pointer">
        <p className=" text-sm font-medium ">Add image</p>
        <PlusIcon className="w-4 ml-1" />
      </span>
    </div>
  );
};

export default PhotoButton;