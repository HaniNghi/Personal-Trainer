import { useState } from "react";
import type { Customer } from "../types";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import CustomerForm from "./CustomerForm";

type AddCustomerProps = {
  handleAddCustomer: (customer: Customer) => void;
};

export default function AddCustomer(props: AddCustomerProps) {
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
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleSubmit = () => {
    props.handleAddCustomer(customer);
    setCustomer({
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
    handleCloseForm();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpenForm}>
        Add Customer
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
