import Box from '@mui/material/Box';
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Button from 'renderer/components/Button';
import Modal from 'renderer/components/Modal';

import { useExpenseContext } from 'renderer/context/ExpenseContext';
import { Expense } from 'renderer/types/expense.type';
import CreateExpForm from './CreateExpForm';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: Expense[]) => Expense[]) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar({ setRows }: EditToolbarProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleExpenseCreated = () => {
    closeModal();
  };

  return (
    <div className="px-4  py-2 flex justify-between items-center">
      <Button onclick={openModal} txt="Create Expense" />
      {/* <Modal
        className="flex justify-center items-center h-full"
        open={modalIsOpen}
        onClose={closeModal}
      >
        <div className='relative'>
          <IconButton
            aria-label="close"
            onClick={closeModal}
            className='absolute top-0 right-0'
          >
            <CloseOutlined />
          </IconButton>
          <CreateExpForm closeModal={closeModal} setRows={setRows} />
        </div>
      </Modal> */}
      <Modal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        content={<CreateExpForm closeModal={closeModal} setRows={setRows} />}
      />

      {/* </Modal> */}
    </div>
  );
}

export default function ExpenseTable({
  // allExpenses,
}: {
  allExpenses: Expense[];
}) {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { getAllExpenses,allExpenses } = useExpenseContext();

  const [rows, setRows] = useState<Expense[]>(allExpenses);
  const [isNew, setIsNew] = useState(false);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  useEffect(() => {
    getAllExpenses();
  }, []);

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => async () => {
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

    if (isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: any, originalRow: any) => {
    const updatedRow = { ...newRow };
    setIsNew(true);

    try {
      // Implement your logic for updating expenses here

      // Update the local state with the modified row
      setRows(rows.map((row) => (row.id === updatedRow.id ? updatedRow : row)));
      return updatedRow;
    } catch (error) {
      console.error(
        `Error updating expense with ID ${updatedRow.expense_id}:`,
        error,
      );
      // Handle error, e.g., show a notification to the user
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      width: 150,
      editable: true,
    },
    {
      field: 'time',
      headerName: 'Time',
      type: 'date',
      width: 200,
      editable: true,
      valueFormatter: (params: GridValueFormatterParams) => {
        return new Date(params.value as number).toLocaleString();
      },
    },
    {
      field: 'details',
      headerName: 'Details',
      width: 120,
      type: 'text',
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
