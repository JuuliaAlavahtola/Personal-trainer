import { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import type { Customer } from "../types";
import CustomerForm from "./CustomerForm";


type Props = {
  handleAdd: (customer: Customer) => void;
};

function AddCustomer({ handleAdd }: Props) {
  const [open, setOpen] = useState(false);

  const emptyCustomer: Customer = {
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  };

  const [customer, setCustomer] = useState<Customer>(emptyCustomer);

  const handleSubmit = () => {
    handleAdd(customer);
    setCustomer(emptyCustomer);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Customer</Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>New Customer</DialogTitle>

        <CustomerForm customer={customer} setCustomer={setCustomer} />

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddCustomer;