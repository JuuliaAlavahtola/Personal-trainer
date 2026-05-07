import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import TrainingForm from "./TrainingForm";
import { saveTraining } from "../api";

type Props = {
  fetchTrainings: () => void;
};

function AddTraining({ fetchTrainings }: Props) {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState<any[]>([]);

  const [training, setTraining] = useState<{
    date: string;
    activity: string;
    duration: number;
    customer: string;
  }>({
    date: "",
    activity: "",
    duration: 0,
    customer: "",
  });


  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data._embedded.customers))
      .catch(console.error);
  }, []);

  const handleSubmit = () => {
    saveTraining(training)
      .then(() => {
        fetchTrainings();
        setOpen(false);
      })
      .catch(console.error);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Training</Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>New Training</DialogTitle>

        <TrainingForm
          training={training}
          setTraining={setTraining}
          customers={customers}
        />

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddTraining;
