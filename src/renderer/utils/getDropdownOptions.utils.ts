import { RxDBTableDocument } from "../types/table.type";

const getDropdownOptions = (options:(RxDBTableDocument | any)[]) => {
    const dropDownOptions = options?.map(t => {
        const option = {value: t?._data?.tableName, label: t?._data?.tableName}
        return option;
    });

    return dropDownOptions;
}

export default getDropdownOptions;