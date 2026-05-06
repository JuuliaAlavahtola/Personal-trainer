import { useEffect, useState } from "react";
import type { CustomerData, Customer } from "../types";
import { DataGrid, type GridColDef, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

function CustomerList() {
  const [customers, setCustomers] = useState<CustomerData[]>([]);

  const fetchCustomers = () => {
    fetch(`${import.meta.env.VITE_API_URL}/customers`)
      .then(res => {
        if (!res.ok) throw new Error("Fetch error");
        return res.json();
      })
      .then(data => setCustomers(data._embedded.customers))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = (url: string) => {
    if (window.confirm("Delete customer?")) {
      fetch(url, { method: "DELETE" })
        .then(res => {
          if (!res.ok) throw new Error("Delete error");
          fetchCustomers();
        })
        .catch(err => console.error(err));
    }
  };

  const handleAdd = (customer: Customer) => {
    fetch(`${import.meta.env.VITE_API_URL}/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then(res => {
        if (!res.ok) throw new Error("Add error");
        fetchCustomers();
      })
      .catch(err => console.error(err));
  };

  const handleUpdate = (url: string, updated: Customer) => {
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
      .then(res => {
        if (!res.ok) throw new Error("Update error");
        fetchCustomers();
      })
      .catch(err => console.error(err));
  };

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "First name", width: 130 },
    { field: "lastname", headerName: "Last name", width: 130 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "streetaddress", headerName: "Address", width: 150 },
    { field: "postcode", headerName: "Postcode", width: 120 },
    { field: "city", headerName: "City", width: 130 },

    {
      field: "delete",
      headerName: "",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          color="error"
          size="small"
          onClick={() => handleDelete(params.row._links.self.href)}
        >
          DELETE
        </Button>
      ),
    },
    {
      field: "edit",
      headerName: "",
      sortable: false,
      filterable: false,
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
      <Stack sx={{ mt: 2, mb: 2 }}>
        <AddCustomer handleAdd={handleAdd} />
      </Stack>

      <div style={{ height: 500 }}>
        <DataGrid
          rows={customers}
          columns={columns}
          getRowId={(row) => row._links.self.href}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
        />
      </div>
    </>
  );
}

export default CustomerList;