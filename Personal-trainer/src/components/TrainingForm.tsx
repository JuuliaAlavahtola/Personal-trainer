import { DialogContent, TextField, MenuItem } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type Props = {
  training: any;
  setTraining: any;
  customers: any[];
};

function TrainingForm({ training, setTraining, customers }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DialogContent>

        <TextField
          margin="dense"
          label="Activity"
          fullWidth
          value={training.activity}
          onChange={(e) =>
            setTraining({ ...training, activity: e.target.value })
          }
        />

        <TextField
          margin="dense"
          label="Duration"
          type="number"
          fullWidth
          value={training.duration}
          onChange={(e) =>
            setTraining({ ...training, duration: Number(e.target.value) })
          }
        />

        <TextField
          select
          margin="dense"
          label="Customer"
          fullWidth
          value={training.customer}
          onChange={(e) =>
            setTraining({ ...training, customer: e.target.value })
          }
        >
          {customers?.map((c) => (
            <MenuItem key={c._links.self.href} value={c._links.self.href}>
              {c.firstname} {c.lastname}
            </MenuItem>
          ))}
        </TextField>

        <DateTimePicker
          label="Date"
          sx={{ mt: 2 }}
          value={training.date ? dayjs(training.date) : null}
          onChange={(newValue) =>
            setTraining({
              ...training,
              date: newValue ? newValue.toISOString() : "",
            })
          }
        />

      </DialogContent>
    </LocalizationProvider>
  );
}

export default TrainingForm;
