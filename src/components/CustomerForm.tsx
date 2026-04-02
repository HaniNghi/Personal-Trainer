import { DialogContent, TextField } from "@mui/material"
import type { Customer } from "../types"

type CustomerFormProps = {
    customer: Customer,
    setCustomer: React.Dispatch<React.SetStateAction<Customer>>
}

export default function CustomerForm(props: CustomerFormProps) {
    return (
        <DialogContent>
            <TextField
                required
                margin="dense"
                label="First Name"
                value={props.customer.firstname}
                onChange={e => props.setCustomer({...props.customer, firstname: e.target.value})}
                fullWidth
                variant="standard"            
            />
            <TextField
                required
                margin="dense"
                label="Last Name"
                value={props.customer.lastname}
                onChange={e => props.setCustomer({...props.customer, lastname: e.target.value})}
                fullWidth
                variant="standard"            
            />
            <TextField
                required
                margin="dense"
                label="Address"
                value={props.customer.streetaddress}
                onChange={e => props.setCustomer({...props.customer, streetaddress: e.target.value})}
                fullWidth
                variant="standard"            
            />
            <TextField
                required
                margin="dense"
                label="Post Code"
                value={props.customer.postcode}
                onChange={e => props.setCustomer({...props.customer, postcode: e.target.value})}
                fullWidth
                variant="standard"            
            />
            <TextField
                required
                margin="dense"
                label="City"
                value={props.customer.city}
                onChange={e => props.setCustomer({...props.customer, city: e.target.value})}
                fullWidth
                variant="standard"            
            />
            <TextField
                required
                margin="dense"
                label="Email"
                value={props.customer.email}
                onChange={e => props.setCustomer({...props.customer, email: e.target.value})}
                fullWidth
                variant="standard"            
            />
            <TextField
                required
                margin="dense"
                label="Phone Number"
                value={props.customer.phone}
                onChange={e => props.setCustomer({...props.customer, phone: e.target.value})}
                fullWidth
                variant="standard"            
            />

        </DialogContent>
    )
}