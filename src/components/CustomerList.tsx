import { useEffect, useState } from "react";
import type { CustomerData } from "../types";
import type { GridColDef} from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { fetchCustomer } from "../api";

export default function CustomerList() {
  const [customers, setCustomers] = useState<CustomerData[]>([]);

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "First Name", width: 150 },
    { field: "lastname", headerName: "Last Name", width: 150 },
    { field: "streetaddress", headerName: "Address", width: 150 },
    { field: "postcode", headerName: "Post Code", width: 100 },
    { field: "city", headerName: "City", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone Number", width: 150 },
  ];

  const getCustomers = () => {
    fetchCustomer()
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <>
        <div className="data-grid-container">
            <DataGrid
                rows={customers}
                columns={columns}
                getRowId={row => row._links.self.href}
                autoPageSize
                rowSelection={false}
            />
        </div>
    </>
  )
}
