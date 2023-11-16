import { useOrders } from "../../../context/OrderContextProvider";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const OrderSortOptions = () => {
  const { sortField, sortOrder, setSortField, setSortOrder } = useOrders();

  const handleSortFieldChange = (event: SelectChangeEvent) => {
    setSortField(event.target.value as string);
  };

  const handleSortOrderChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value as "asc" | "desc");
  };

  return (
    <div className="flex gap-2 p-2">
      <div className="min-w-[6rem]">
        <FormControl fullWidth>
          <InputLabel id="field">Sort By</InputLabel>
          <Select
            labelId="field"
            id="field"
            value={sortField}
            label="Sort By"
            onChange={handleSortFieldChange}
          >
            <MenuItem value={"orderTime"}>Time</MenuItem>
            <MenuItem value={"totalPrice"}>Price</MenuItem>
            <MenuItem value={"paymentStatus"}>Status</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="min-w-[6rem]">
        <FormControl fullWidth>
          <InputLabel id="Order">Sort Order</InputLabel>
          <Select
            labelId="Order"
            id="Order"
            value={sortOrder}
            label="Sort Order"
            onChange={handleSortOrderChange}
          >
            <MenuItem value={"asc"}>ASC</MenuItem>
            <MenuItem value={"desc"}>DESC</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default OrderSortOptions;
