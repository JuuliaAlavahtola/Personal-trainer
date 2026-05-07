import { useEffect, useState } from "react";
import type { CustomerData, Customer } from "../types";
import { DataGrid, type GridColDef, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { getCustomers, saveCustomer, updateCustomer, deleteCustomer } from "../api";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import DeleteIcon from "@mui/icons-material/Delete";



function CustomerList() {
  const [customers, setCustomers] = useState<CustomerData[]>([]);

  const fetchData = () => {
    getCustomers()
      .then(data => setCustomers(data._embedded.customers))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = (customer: Customer) => {
    saveCustomer(customer)
      .then(fetchData)
      .catch(console.error);
  };

  const handleUpdate = (url: string, customer: Customer) => {
    updateCustomer(url, customer)
      .then(fetchData)
      .catch(console.error);
  };

  const handleDelete = (url: string) => {
    if (window.confirm("Delete customer?")) {
      deleteCustomer(url)
        .then(fetchData)
        .catch(console.error);
    }
  };

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "First name", width: 130 },
    { field: "lastname", headerName: "Last name", width: 130 },
    { field: "streetaddress", headerName: "Street Address", width: 130 },
    { field: "postcode", headerName: "Postcode", width: 130 },
    { field: "city", headerName: "city", width: 130 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "email", headerName: "Email", width: 300 },


    {
      field: "delete",
      headerName: "",
      renderCell: (params) => (
        <Button
          color="error"
          onClick={() => handleDelete(params.row._links.self.href)}
        >
          <DeleteIcon />
        </Button>
      ),
    },
    {
      field: "edit",
      headerName: "",
      renderCell: (params) => (
        <EditCustomer
          customer={params.row}
          handleUpdate={handleUpdate}
        />
      ),
    },
  ];

  return (
    <>
      <Stack sx={{ mt: 2, width: "100%" }}>
        <AddCustomer handleAdd={handleAdd} />
      </Stack>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={customers}
          columns={columns}
          getRowId={(row) => row._links.self.href}
          slots={{ toolbar: GridToolbar }}
        />
      </div>
    </>
  );
}

export default CustomerList;