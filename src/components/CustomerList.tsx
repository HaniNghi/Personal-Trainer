import { useEffect, useState } from "react";
import type { Customer, Training} from "../types";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { fetchCustomer, fetchAddCustomer, fetchAddTraining } from "../api";
import { Stack } from "@mui/material";
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "First Name", width: 150 },
    { field: "lastname", headerName: "Last Name", width: 150 },
    { field: "streetaddress", headerName: "Address", width: 150 },
    { field: "postcode", headerName: "Post Code", width: 100 },
    { field: "city", headerName: "City", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone Number", width: 150 },
    // { field: "_links.seft.trainings",
    //   headerName: "",
    //   sortable: false,
    //   filterable: false,
    //   renderCell: (params: GridRenderCellParams) =>{
    //     <Stack direction="row" sx={{ mt: 2, mb: 2 }}>
    //       <AddTraining handleAddTraining={handleAddTraining} />
    //     </Stack>
    //   }
    //  }
  ];

  const getCustomers = () => {
    fetchCustomer()
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const handleAddCustomer = (customer: Customer) => {
    fetchAddCustomer(customer)
      .then(() => getCustomers())
      .catch((err) => console.error(err));
  };

  // const handleAddTraining = (training: Training) => {
  //     fetchAddTraining(training)
  //       .then(() => getTrainings())
  //       .catch((err) => console.error(err));
  //   };

  return (
    <>
      <Stack direction="row" sx={{ mt: 2, mb: 2 }}  >
        <AddCustomer handleAddCustomer={handleAddCustomer} />
      </Stack>
      <div className="data-grid-container">
        <DataGrid
          rows={customers}
          columns={columns}
          getRowId={(row) => row._links.self.href}
          autoPageSize
          rowSelection={false}
        />
      </div>
    </>
  );
}
