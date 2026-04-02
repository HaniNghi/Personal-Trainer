import { useEffect, useState } from "react";
import type { Training } from "../types";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { fetchTraining } from "../api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { fetchAddTraining } from "../api";
import { Stack } from "@mui/material";
import AddTraining from "./AddTraining";

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
  ];

  const getTrainings = () => {
    fetchTraining()
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTrainings();
  }, []);

  const handleAddTraining = (training: Training) => {
    fetchAddTraining(training)
      .then(() => getTrainings())
      .catch((err) => console.error(err));
  };

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
