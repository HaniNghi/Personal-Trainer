import { useEffect, useState } from "react";
import type { TrainingData } from "../types";
import type { GridColDef} from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { fetchTraining } from "../api";

export default function CustomerList() {
  const [trainings, setTrainings] = useState<TrainingData[]>([]);

  const columns: GridColDef[] = [
    { field: "date", headerName: "Date", width: 150 },
    { field: "duration", headerName: "Duration", width: 150 },
    { field: "activity", headerName: "Activity", width: 150 },
  ];

  const getTrainings = () => {
    fetchTraining()
      .then((data) => setTrainings(data._embedded.customers))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTrainings();
  }, []);

  return (
    <>
        <div style={{width: "100%", height: 500}}>
            <DataGrid
                rows={trainings}
                columns={columns}
                getRowId={row => row._links.self.href}
                autoPageSize
                rowSelection={false}
            />
        </div>
    </>
  )
}
