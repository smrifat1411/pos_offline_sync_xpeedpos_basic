type Props = {
  newOptionValue: string;
  setNewOptionValue: any;
  handleCreateNewOption: any;
};

const CategoryInputField = ({
  newOptionValue,
  setNewOptionValue,
  handleCreateNewOption,
}: Props) => {
  return (
    <div className="py-1 pb-4 flex gap-2">
      <input
        type="text"
        value={newOptionValue}
        onChange={(e) => setNewOptionValue(e.target.value)}
        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
        placeholder="Enter new Category"
        required
      />
      <button
        type="button"
        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-1 px-2 border text-sm border-gray-700 rounded"
        onClick={handleCreateNewOption}
      >
        Add
      </button>
    </div>
  );
};

export default CategoryInputField;
