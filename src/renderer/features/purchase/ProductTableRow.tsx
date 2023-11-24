import * as React from 'react';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { Button, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'renderer/types/product';
import { useProductContext } from 'renderer/context/ProductContext';

type Props = { product: Product }; // Assuming you have a Product type

const ProductTableRow = ({ product }: Props) => {
  const { updateProductById } = useProductContext();
  const [isEditing, setIsEditing] = React.useState(false);
  const [updatedValues, setUpdatedValues] = React.useState<Product>({ ...product });

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150, editable: isEditing },
    { field: 'category', headerName: 'Category', width: 150, editable: isEditing },
    { field: 'buyingPrice', headerName: 'Buying Price', width: 150, editable: isEditing },
    { field: 'sellingPrice', headerName: 'Selling Price', width: 150, editable: isEditing },
    { field: 'stockAmount', headerName: 'Stock Amount', width: 150, editable: isEditing },
    { field: 'discount', headerName: 'Discount', width: 150, editable: isEditing },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params: GridCellParams) => (
        <div>
          {isEditing ? null : (
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => handleEditClick(params.id as number)}
              style={{ cursor: 'pointer' }}
            />
          )}
        </div>
      ),
    },
  ];

  const rows = [
    {
      id: product.id || 0,
      name: updatedValues.name || '',
      category: updatedValues.category || '',
      buyingPrice: updatedValues.buyingPrice?.toString() || '',
      sellingPrice: updatedValues.sellingPrice?.toString() || '',
      stockAmount: updatedValues.stockAmount?.toString() || '',
      discount: updatedValues.discount?.toString() || '',
    },
  ];

  const handleEditClick = (id: number) => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (product.id) {
      const updatedProduct = { ...product, ...updatedValues };
      await updateProductById(product.id, updatedProduct);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setUpdatedValues(product);
    setIsEditing(false);
  };

  return (
    <div style={{}}>
      <DataGrid
        rows={rows}
        columns={columns}
        // pageSize={1}
        // disableSelectionOnClick
        components={{
          Toolbar: () => (
            <div>
              {isEditing ? (
                <>
                  <Button onClick={handleUpdate}>Update</Button>
                  <Button onClick={handleCancel}>Cancel</Button>
                </>
              ) : null}
            </div>
          ),
        }}
      />
    </div>
  );
};

export default ProductTableRow;
