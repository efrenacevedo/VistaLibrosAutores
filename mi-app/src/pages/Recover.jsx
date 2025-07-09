import { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import api from "../services/api";

export default function Recover() {
  const [username, setUsername] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const getQuestion = async () => {
    try {
      const res = await api.post("/get-question", { username });
      setQuestion(res.data.securityQuestion);
    } catch (err) {
      setMsg("Error: " + err.response?.data?.error || err.message);
    }
  };

  const resetPassword = async () => {
    try {
      await api.post("/reset-password", { username, answer, newPassword });
      setMsg("Contraseña actualizada correctamente");
    } catch (err) {
      setMsg("Error: " + err.response?.data?.error || err.message);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Recuperar Contraseña</Typography>
      <TextField
        fullWidth
        label="Nombre de Usuario"
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button onClick={getQuestion}>Obtener pregunta</Button>

      {question && (
        <>
          <Typography sx={{ mt: 2 }}>{question}</Typography>
          <TextField
            fullWidth
            label="Respuesta"
            margin="normal"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <TextField
            fullWidth
            label="Nueva contraseña"
            type="password"
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button variant="contained" fullWidth onClick={resetPassword}>
            Cambiar contraseña
          </Button>
        </>
      )}
      <Typography color="info.main" sx={{ mt: 2 }}>
        {msg}
      </Typography>
    </Box>
  );
}
