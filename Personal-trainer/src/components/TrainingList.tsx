import { useEffect, useState } from "react";
import { deleteTraining, getTrainings } from "../api";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import type { TrainingData } from "../types";

function TrainingList() {
  const [trainings, setTrainings] = useState<TrainingData[]>([]);

  const fetchData = () => {
    getTrainings()
      .then((data) => setTrainings(data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Delete training?")) {
      deleteTraining(id)
        .then(fetchData)
        .catch(console.error);
    }
  };

  const columns: GridColDef<TrainingData>[] = [
    {
      field: "date",
      headerName: "Date",
      width: 180,
      renderCell: (params: GridRenderCellParams<TrainingData>) =>
        dayjs(params.value as string).format("DD.MM.YYYY HH:mm"),
    },
    {
      field: "activity",
      headerName: "Activity",
      width: 150,
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 120,
    },
    {
      field: "customer",
      headerName: "Customer",
      width: 200,
      renderCell: (params: GridRenderCellParams<TrainingData>) =>
        `${params.row.customer.firstname} ${params.row.customer.lastname}`,
    },
    {
      field: "delete",
      headerName: "",
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<TrainingData>) => (
        <Button
          color="error"
          onClick={() => handleDelete(params.row.id)}
        >
          DELETE
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 500 }}>
      <DataGrid
        rows={trainings}
        columns={columns}
        getRowId={(row) => row.id}
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
}

export default TrainingList;