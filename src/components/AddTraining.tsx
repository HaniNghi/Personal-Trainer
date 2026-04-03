import { useState } from "react";
import type { TrainingSimple } from "../types";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import TrainingForm from "./TrainingForm";
import dayjs from "dayjs";

type AddTrainingProps = {
  handleAddTraining: (training: TrainingSimple) => void;
};

export default function AddTraining(props: AddTrainingProps) {
  const [openForm, setOpenForm] = useState(false);
  const [training, setTraining] = useState<TrainingSimple>({
    date: dayjs(),
    duration: 0, 
    activity: "",
  });

  const handleClickOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleSubmit = () => {
    props.handleAddTraining(training);
    setTraining({
        date: dayjs(""),
        duration: 0, 
        activity: "",
    });
    handleCloseForm();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpenForm}>
        Add Training
      </Button>
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>New Training</DialogTitle>
        <TrainingForm training={training} setTraining={setTraining} />
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
