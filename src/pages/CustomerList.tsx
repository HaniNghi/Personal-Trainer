import { useEffect, useState } from "react";
import type { Customer, Training } from "../types";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid} from "@mui/x-data-grid";
import { fetchCustomer, fetchAddCustomer, fetchAddTraining, deleteCustomer, updateCustomer } from "../api";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
} from "@mui/material";
import AddCustomer from "../components/AddCustomer";
import TrainingForm from "../components/TrainingForm";
import dayjs from "dayjs";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditCustomer from '../components/EditCustomer'

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  const [training, setTraining] = useState<Training>({
    date: dayjs(),
    duration: 0,
    activity: "",
  });

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "First Name", width: 150 },
    { field: "lastname", headerName: "Last Name", width: 150 },
    { field: "streetaddress", headerName: "Address", width: 150 },
    { field: "postcode", headerName: "Post Code", width: 100 },
    { field: "city", headerName: "City", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone Number", width: 150 },
    {
      field: "_links.trainings.href",
      headerName: "",
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Button
            color="error"
            size="small"
            onClick={() => {
              setSelectedCustomer(params.id as string);
              setOpenForm(true);
            }}
          >
            <AddIcon sx={{color: "black"}}/>
          </Button>
        );
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
          onClick={() => handleDelete(params.id as string)}>
          <DeleteIcon fontSize="small"/>
        </Button>
    },    
    {
      field:"_links.customer.href",
      headerName: "",
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => 
        <EditCustomer url={params.id as string} customer={params.row} handleUpdateCustomer = {handleUpdate}/>
    },

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

  const handleSaveTraining = () => {
    if (!selectedCustomer) return;

    const newTraining = {
      ...training,
      customer: selectedCustomer,
    };

    fetchAddTraining(newTraining)
      .then(() => {
        setTraining({
          date: dayjs(),
          duration: 0,
          activity: "",
        });
        setOpenForm(false);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (url: string) => {
    if (window.confirm("Are you sure?")) {
      deleteCustomer(url)
      .then(() => getCustomers())
      .catch(err => console.error(err));
    }
  }

  const handleUpdate = (url: string, updatedCustomer: Customer) => {
    updateCustomer(url, updatedCustomer)
    .then(() => getCustomers())
    .catch(err => console.error(err))
  }

  return (
    <>
      <Stack direction="row" sx={{ mt: 2, mb: 2 }}>
        <AddCustomer handleAddCustomer={handleAddCustomer} />
      </Stack>
      <div className="data-grid-container">
        <DataGrid
          rows={customers}
          columns={columns}
          getRowId={(row) => row._links.self.href}
          autoPageSize
          rowSelection={false}
          showToolbar
        />
      </div>
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>New Training</DialogTitle>

        <TrainingForm training={training} setTraining={setTraining} />

        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button onClick={handleSaveTraining}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
