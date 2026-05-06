import type { Customer } from '../types';
import { DialogContent, TextField } from "@mui/material";

type CustomerFormType = {
    customer : Customer;
    setCustomer: React.Dispatch<React.SetStateAction<Customer>>
}

function CustomerForm({customer, setCustomer}: CustomerFormType) {
return (
    <DialogContent>
        <TextField
              required
              margin="dense"
              label="First name"
              value = {customer.firstname}
              onChange={e => setCustomer({ ...customer, firstname: e.target.value})}
              fullWidth
              variant="standard"
            />
             <TextField
              required
              margin="dense"
              label="Last name"
              value = {customer.lastname}
              onChange={e => setCustomer({ ...customer, lastname: e.target.value})}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              label="Street Address"
              value = {customer.streetaddress}
              onChange={e => setCustomer({ ...customer, streetaddress: e.target.value})}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              label="Postcode"
              value = {customer.postcode}
              onChange={e => setCustomer({ ...customer, postcode: e.target.value})}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              label="City"
              value = {customer.city}
              onChange={e => setCustomer({ ...customer, city: e.target.value})}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              label="E-mail"
              value = {customer.email}
              onChange={e => setCustomer({ ...customer, email: e.target.value})}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              label="Phone Number"
              value = {customer.phone}
              onChange={e => setCustomer({ ...customer, phone: e.target.value})}
              fullWidth
              variant="standard"
            />
        </DialogContent>
    )
}
export default CustomerForm;