import React, { useEffect, useState } from "react";
import Select from "react-select";
import CategoryInputField from "./CategoryInputField";

import { CategoryDocumentType } from "../../../types/category.type";

interface Props {
  selectedCategory: string | any | null;
  onCategoryChange: any;
}

const CategoryDropdown: React.FC<Props> = ({
  selectedCategory,
  onCategoryChange,
}) => {


  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  const [selectedOption, setSelectedOption] = useState<CategoryDocumentType | null>( selectedCategory ? {
    label: selectedCategory.toUpperCase(),
    value: selectedCategory
  } : null);
  const [newOptionValue, setNewOptionValue] = useState("");
  const isNewOption = selectedOption?.value === "createNew";
  const [myoptions, setMyOptions] = useState<CategoryDocumentType[]>([]);
  const apiUrl = 'https://pos-api.xpeedlab.tech/v1/categories';

  useEffect(() => {

  }, [isOnline]);

  const getDropdownOption = (option: CategoryDocumentType) => {
    const { label, value } = option;
    return { label, value };
  }


  const handleOptionChange = (option: CategoryDocumentType | null) => {
    setSelectedOption(option);
    onCategoryChange(option);
  };

  const handleCollectionChange = async () => {
    // const data = await getCategoriesData(categorycollection);
    // setMyOptions(data);
  };


  const handleCreateNewOption = async (event:React.MouseEvent<HTMLButtonElement>) => {
    if (newOptionValue.trim() !== "") {
      const newOption: CategoryDocumentType = {
        value: newOptionValue.toLocaleLowerCase(),
        label: newOptionValue,
        isOnline: false,
      };

    }
  };

  const options: CategoryDocumentType[] = [
    ...myoptions,
    { value: "createNew", label: "Create New" },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      <Select
        options={options}
        defaultValue={selectedOption}
        onChange={handleOptionChange}
      />
      {isNewOption && (
        <CategoryInputField
          newOptionValue={newOptionValue}
          setNewOptionValue={setNewOptionValue}
          handleCreateNewOption={handleCreateNewOption}
        />
      )}
    </div>
  );
};

export default CategoryDropdown;
