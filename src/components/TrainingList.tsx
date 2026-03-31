import { useEffect, useState } from "react";
import type { TrainingData } from "../types";
import type { GridColDef} from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { fetchTraining } from "../api";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';



export default function TrainingList() {
  const [trainings, setTrainings] = useState<TrainingData[]>([]);
  dayjs.extend(utc);


  const columns: GridColDef[] = [
    { field: "date", headerName: "Date", width: 250, valueFormatter: (params) =>
      dayjs.utc(params).format('DD/MM/YYYY, HH:mm'),
  },
    { field: "duration", headerName: "Duration (minutes)", width: 150 },
    { field: "activity", headerName: "Activity", width: 150 },
  ];

  const getTrainings = () => {
    fetchTraining()
      .then((data) => setTrainings(data._embedded.trainings))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTrainings();
  }, []);

  return (
    <>
        <div className="data-grid-container">
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
