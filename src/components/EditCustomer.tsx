import { useState } from "react";
import type { Customer } from "../types";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import CustomerForm from "./CustomerForm";
import BorderColorIcon from '@mui/icons-material/BorderColor';

type EditCustomerProps = {
  url: string;
  customer: Customer;
  handleUpdateCustomer: (url: string,updatedCustomer: Customer) => void;
};

export default function EditCustomer(props: EditCustomerProps) {
  const [openForm, setOpenForm] = useState(false);
  const [customer, setCustomer] = useState<Customer>({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
    _links: {
      self: {
        href: "",
      },
      customer: {
        href: "",
      },
      trainings: {
        href: "",
      },
    },
  });

  const handleClickOpenForm = () => {
    setCustomer({
      firstname: props.customer.firstname,
      lastname: props.customer.lastname,
      streetaddress: props.customer.streetaddress,
      postcode: props.customer.postcode,
      city: props.customer.city,
      email: props.customer.email,
      phone: props.customer.phone,
      _links: props.customer._links,
    });
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleSubmit = () => {
    props.handleUpdateCustomer(props.url, customer);
    handleCloseForm();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpenForm}>
        <BorderColorIcon fontSize="small"/>
      </Button>
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>New Customer</DialogTitle>
        <CustomerForm customer={customer} setCustomer={setCustomer} />
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
