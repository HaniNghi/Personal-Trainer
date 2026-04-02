import { DialogContent, TextField } from "@mui/material";
import type { TrainingSimple } from "../types";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";
import NumberField from "./NumberField";


type TrainingFormProps = {
  training: TrainingSimple;
  setTraining: React.Dispatch<React.SetStateAction<TrainingSimple>>;
};

export default function TrainingForm(props: TrainingFormProps) {
  return (
    <DialogContent>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
          <DateTimePicker
            label="Training Date and Time"
            value={props.training.date}
            onChange={(e: Dayjs | null) => {
              if (!e) return;
              props.setTraining({ ...props.training, date: e });
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      <NumberField
        label="Duration"
        value={props.training.duration}
        onValueChange={(e) =>
          props.setTraining({ ...props.training, duration: Number(e ?? 0) })
        }
      />
      <TextField
        required
        margin="dense"
        label="Activity"
        value={props.training.activity}
        onChange={(e) =>
          props.setTraining({ ...props.training, activity: e.target.value })
        }
        fullWidth
        variant="standard"
      />
    </DialogContent>
  );
}
