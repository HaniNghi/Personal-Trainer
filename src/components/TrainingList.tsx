import { useEffect, useState } from "react";
import type { Training, TrainingSimple } from "../types";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { deleteTraining, fetchTraining } from "../api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { fetchAddTraining } from "../api";
import { Button, Stack } from "@mui/material";
import AddTraining from "./AddTraining";
import DeleteIcon from '@mui/icons-material/Delete';


export default function TrainingList() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  dayjs.extend(utc);

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      width: 250,
      valueFormatter: (params) => dayjs.utc(params).format("DD/MM/YYYY, HH:mm"),
    },
    { field: "duration", headerName: "Duration (minutes)", width: 150 },
    { field: "activity", headerName: "Activity", width: 150 },
    {
      field: "customerFirstName",
      headerName: "Customer Name",
      width: 150,
      valueGetter: (_, row) => {
        return `${row.customer.firstname || ""} ${row.customer.lastname || ""}`;
      },
    },
    {
      field: "_links.self.href",
      headerName: "",
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) =>
        <Button 
          color="error" 
          size="small" 
          onClick={() => handleDelete(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${params.id}`)}>
          <DeleteIcon fontSize="small"/>
        </Button>
    },    
  ];

  const getTrainings = () => {
    fetchTraining()
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTrainings();
  }, []);

  const handleAddTraining = (training: TrainingSimple) => {
    fetchAddTraining(training)
      .then(() => getTrainings())
      .catch((err) => console.error(err));
  };

  const handleDelete = (url: string) => {
      if (window.confirm("Are you sure?")) {
        deleteTraining(url)
        .then(() => getTrainings())
        .catch(err => console.error(err));
      }
    }

  return (
    <>
      <Stack direction="row" sx={{ mt: 2, mb: 2 }}>
        <AddTraining handleAddTraining={handleAddTraining} />
      </Stack>
      <div className="data-grid-container">
        <DataGrid
          rows={trainings}
          columns={columns}
          getRowId={(row) => row.id}
          autoPageSize
          rowSelection={false}
        />
      </div>
    </>
  );
}
