import { useState } from "react";

import { Stack, TextField, Typography, Button, Chip } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { setErrorMsg, setSuccessMsg } from "src/redux/alert";
import { useDispatch } from "react-redux";
import axiosClient from "src/api/axiosClient";
// ----------------------------------------------------------------------
export default function CreateAdminForm() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [receivers, setReceivers] = useState([]);

  const enterPressed = (e) => {
    if (e && e.keyCode === 13 && input.length !== 0) {
      document.getElementById("myForm").submit();
    }
  };
  const handleAdd = (e) => {
    e.preventDefault();
    setReceivers([...receivers, input]);
    setInput("");
  };
  const removeReceiver = (i) => {
    let newReceivers = [...receivers];
    newReceivers.splice(i, 1);
    setReceivers([...newReceivers]);
  };
  async function handleInvite() {
    try {
      setLoading(true);
      const res = await axiosClient.post("/api/admin/invite-admins", {
        emails: receivers,
      });
      setLoading(false);

      const { message } = res.data.data;
      dispatch(setSuccessMsg(message));
      setReceivers([]);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
  }

  return (
    <form id="myForm" onSubmit={handleAdd}>
      <Stack direction="row" marginBottom={2} width="100%">
        <TextField
          label="Admin emails"
          type="email"
          InputLabelProps={{ sx: { textTransform: "capitalize" } }}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={() => enterPressed()}
          fullWidth={true}
          value={input}
        />
        <Button disabled={input.length === 0} variant="contained" type="submit">
          Add
        </Button>
      </Stack>

      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: "text.secondary",
          mb: 1,
          textTransform: "capitalize",
        }}
      >
        Admins to be invited:
      </Typography>
      <Stack direction="row" width="100%" flexWrap="wrap" marginBottom={2}>
        {receivers.map((receiver, i) => (
          <Chip
            color={"primary"}
            key={i}
            label={receiver}
            onClick={() => removeReceiver(i)}
            onDelete={() => removeReceiver(i)}
            sx={{ m: 0.25 }}
          />
        ))}
      </Stack>
      <LoadingButton
        onClick={handleInvite}
        fullWidth
        size="large"
        variant="contained"
        loading={loading}
        disabled={receivers.length === 0 ? true : false}
      >
        Invite
      </LoadingButton>
    </form>
  );
}
