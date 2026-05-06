import { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import CustomerForm from "./CustomerForm";
import type { CustomerData, Customer } from "../types";

type Props = {
  customer: CustomerData;
  handleUpdate: (url: string, updated: Customer) => void;
};

function EditCustomer({ customer: original, handleUpdate }: Props) {
  const [open, setOpen] = useState(false);

  const [customer, setCustomer] = useState<Customer>({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const openDialog = () => {
    setCustomer({
      firstname: original.firstname,
      lastname: original.lastname,
      streetaddress: original.streetaddress,
      postcode: original.postcode,
      city: original.city,
      email: original.email,
      phone: original.phone,
    });
    setOpen(true);
  };

  const handleSubmit = () => {
    handleUpdate(original._links.self.href, customer);
    setOpen(false);
  };

  return (
    <>
      <Button size="small" onClick={openDialog}>
        EDIT
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Customer</DialogTitle>

        <CustomerForm customer={customer} setCustomer={setCustomer} />

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditCustomer;