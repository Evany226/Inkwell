import { useLocalStorage } from "../../config/localStorage";

const CheckListItem = ({
  listItem,
  listId,
}: {
  listItem: string;
  listId: string;
}) => {
  const [checked, setChecked] = useLocalStorage(`checked-${listId}`, false);

  return (
    <div className="flex items-center outline-none">
      <input
        type="checkbox"
        className="border-gray-500"
        checked={checked || false}
        onChange={(e) => {
          setChecked(e.target.checked);
          console.log(e.target.checked);
        }}
      ></input>
      <label className="ms-2 text-base text-black font-normal">
        {listItem}
      </label>
    </div>
  );
};

export default CheckListItem;
