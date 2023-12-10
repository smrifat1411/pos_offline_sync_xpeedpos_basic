import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import CategoryInputField from './CategoryInputField';

import { CategoryDocumentType } from '../../../types/category.type';
import { setOptions } from 'react-chartjs-2/dist/utils';

interface Props {
  selectedCategory: string | any | null;
  onCategoryChange: any;
}

const CategoryDropdown: React.FC<Props> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const [selectedOption, setSelectedOption] =
    useState<CategoryDocumentType | null>(
      selectedCategory
        ? {
            label: selectedCategory.toUpperCase(),
            value: selectedCategory,
          }
        : null,
    );
  const [newOptionValue, setNewOptionValue] = useState('');
  const [myoptions, setMyOptions] = useState<CategoryDocumentType[]>([]);

  useEffect(() => {
    handleCollectionChange();
  }, []);

  const handleOptionChange = (option: CategoryDocumentType | null) => {
    setSelectedOption(option);
    onCategoryChange(option);
  };

  const handleCollectionChange = async () => {
    const { data } = await window.electron.getAllCategories();
    setMyOptions(data);
  };

  const handleCreateNewOption = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (newOptionValue.trim() !== '') {
      const newOption: CategoryDocumentType = {
        value: newOptionValue.toLocaleLowerCase(),
        label: newOptionValue,
      };
      try {
        const createCategory = await window.electron.createCategory(newOption);

        if (createCategory !== false) {
          setMyOptions((prev) => [...prev, newOption]);
          handleOptionChange(newOption);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const options: CategoryDocumentType[] = [
    { value: 'createNew', label: 'Create New' },
    ...myoptions,
  ];

  // create new in different color
  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor:
        state.data.value === 'createNew' ? '#f5c242' : provided.backgroundColor,
      color: state.data.value === 'createNew' ? 'black' : provided.color,
      // Adjust the colors as needed
    }),
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Select
        options={options}
        value={selectedOption}
        onChange={(option) =>
          handleOptionChange(option as CategoryDocumentType)
        }
        styles={customStyles}
      />
      {selectedOption?.value === 'createNew' && (
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
