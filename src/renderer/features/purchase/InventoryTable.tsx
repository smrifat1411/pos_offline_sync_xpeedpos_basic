import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import { useEffect, useState } from 'react';
import { useProductContext } from 'renderer/context/ProductContext';
import ProductCreateForm from '../products/components/ProductCreateForm';
import Modal from 'renderer/components/Modal';
import Button from 'renderer/components/Button';

interface Product {
  id?: number;
  name: string;
  category: string;
  sellingPrice: number;
  discountable?: number;
  discount?: number;
  buyingPrice: number;
  stockAmount: number;
}

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleProductCreated = () => {
    closeModal();
  };


  return (
    <div className="px-4  py-2 flex  items-center">
      <Button onclick={openModal} txt="Create Product" />
      <Modal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        content={<ProductCreateForm onSuccess={handleProductCreated} />}
      />
    </div>
  );
}

export default function InventoryTable() {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { updateProductById, allProducts } = useProductContext();
  const [rows, setRows] = useState<Product[]>(allProducts);
  const [isNew, setIsNew] = useState(false);



  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => async () => {
    // Find the edited row
    // const editedRow = rows.find((row) => row.id === id);

    // Update the local state immediately for a responsive UI
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    // const editedRow = rows.find((row) => row.id === id);
    if (isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: any) => {
    const updatedRow = { ...newRow };
    setIsNew(true);

    try {
      updateProductById(newRow.id, {
        ...newRow,
      });
    } catch (error) {
      console.error(`Error updating product with ID ${updatedRow.id}:`, error);
      // Handle error, e.g., show a notification to the user
    }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const CustomSellingPriceCell = (params: any) => {
    const { value } = params;
    const sellingPrice = value as unknown as number;
    const discount = params.row.discount as number;
    const discountedPrice = sellingPrice - (discount * sellingPrice) / 100;

    return (
      <span>
        {discountedPrice.toFixed(2)} ({discount}%)
      </span>
    );
  };


  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'category', headerName: 'Category', width: 180, editable: false },

    {
      field: 'sellingPrice',
      headerName: 'Selling Price',
      type: 'number',
      width: 150,
      editable: true,
      renderCell: CustomSellingPriceCell,

    },
    {
      field: 'discount',
      headerName: 'Discount',
      type: 'number',
      width: 120,
      editable: true,
    },
    {
      field: 'buyingPrice',
      headerName: 'Buying Price',
      type: 'number',
      width: 150,
      editable: true,
    },
    {
      field: 'stockAmount',
      headerName: 'Stock Amount',
      type: 'number',
      width: 150,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"

        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
