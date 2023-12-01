import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import { randomArrayItem } from '@mui/x-data-grid-generator';
import { useEffect, useState } from 'react';
import Button from 'renderer/components/Button';
// import Modal from 'renderer/components/Modal';
import { useProductContext } from 'renderer/context/ProductContext';
import ProductCreateForm from '../products/components/ProductCreateForm';
import { Card, Modal } from '@mui/material';
import { useAuth } from 'renderer/context/AuthContextProvider';
import LinearProgress from '@mui/material/LinearProgress';

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
    <div className="px-4  py-2 flex justify-between items-center">
      <Button onclick={openModal} txt="Create Product" />
      <Modal
        open={modalIsOpen}
        className="flex justify-center items-center"
        onClose={closeModal}
      >
        <Card className="p-2 pt-5">
          <ProductCreateForm onSuccess={handleProductCreated} />
        </Card>
      </Modal>
      {/* <Button onclick={openModal} txt="Create Pod" />
      <Modal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        content={<ProductCreateForm onSuccess={handleProductCreated} />}
      /> */}
    </div>
  );
}

export default function InventoryTable() {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { updateProductById, allProducts, getAllProducts } =
    useProductContext();
  const [rows, setRows] = useState<Product[]>(allProducts);
  const [isNew, setIsNew] = useState(false);

  // useEffect(() => {
  //   window.electron.getAllProducts().then((products: Product[]) => {
  //     setRows(products);
  //   });
  // }, []);

  const { userDetails } = useAuth();
  const isBuyingPriceVisible = userDetails?.role === 'admin';

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

  const handleDeleteClick = (id: GridRowId) => async () => {
    setRows(rows?.filter((row) => row.id !== id));
    const { success } = await window.electron.deleteProductById(id as number);

    success && getAllProducts();
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    // const editedRow = rows.find((row) => row.id === id);
    if (isNew) {
      setRows(rows?.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: any, originalRow: any) => {
    const updatedRow = { ...newRow };
    setIsNew(true);

    try {
      if (
        newRow.discountedAmount !== undefined &&
        originalRow.discount === newRow.discount
      ) {
        const sellingPrice = newRow.sellingPrice as number;
        const discountedAmount = newRow.discountedAmount as number;
        const discount = (discountedAmount / sellingPrice) * 100;
        updatedRow.discount = discount;

        const { discountedAmount: _, ...updatePayload } = updatedRow;
        updateProductById(updatedRow.id, updatePayload);

        // Update the discount percentage in the row

        // Exclude the discountedAmount property from the update call
        // const { discountedAmount: _, ...updatePayload } = updatedRow;
      } else {
        const { discountedAmount: _, ...updatePayload } = updatedRow;
        updateProductById(updatedRow.id, updatePayload);
      }
    } catch (error) {
      console.error(`Error updating product with ID ${updatedRow.id}:`, error);
      // Handle error, e.g., show a notification to the user
    }

    // Update the local state with the modified row
    setRows(rows?.map((row) => (row.id === updatedRow.id ? updatedRow : row)));
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

    return <span>{discountedPrice}</span>;
  };

  const buyingPriceColumn: GridColDef | boolean = {
    field: 'buyingPrice',
    headerName: 'Buying Price',
    type: 'number',
    width: 150,
    editable: true,
  };
  const totalAmountColumn: GridColDef = {
    field: 'totalAmount',
    headerName: 'Total Amount',
    type: 'number',
    width: 120,
    editable: false,
    valueGetter: (params: any) => {
      const sellingPrice = params.row.sellingPrice as number;
      const stockAmount = params.row.stockAmount as number;
      const totalAmount = sellingPrice * stockAmount;
      return totalAmount;
    },
  };
  const columns: any[] = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'category', headerName: 'Category', width: 120, editable: false },

    {
      field: 'sellingPrice',
      headerName: 'Selling Price',
      type: 'number',
      width: 150,
      editable: true,
      renderCell: CustomSellingPriceCell,
      cellClassName: '',
    },
    {
      field: 'discount',
      headerName: 'Discount (%)',
      type: 'number',
      width: 120,
      editable: true,
      valueFormatter: (params: GridValueFormatterParams) => {
        // Format the discount value with no decimal places
        const formattedDiscount = params.value.toFixed(0);
        return `${formattedDiscount}%`;
      },
    },

    {
      field: 'discountedAmount',
      headerName: 'Discounted (tk)',
      type: 'number',
      width: 130,
      editable: true,
      valueGetter: (params: any) => {
        const sellingPrice = params.row.sellingPrice as number;
        const discount = params.row.discount as number;
        const discountedAmount = (discount * sellingPrice) / 100;
        return discountedAmount;
      },
    },
    ...(isBuyingPriceVisible ? [buyingPriceColumn] : []),
    ,
    {
      field: 'stockAmount',
      headerName: 'Stock Amount',
      type: 'number',
      width: 150,
      editable: true,
    },
    totalAmountColumn,
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }: any) => {
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
      {rows !== undefined && (
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          // loading={}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          getRowClassName={(params) => ``}
          slots={{
            toolbar: EditToolbar,
            loadingOverlay: LinearProgress,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      )}
    </Box>
  );
}
