import { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/register", {
        username,
        password,
        securityQuestion: question,
        securityAnswer: answer,
      });
      // Después del registro exitoso, redirige a /home
      navigate("/autores");
    } catch (err) {
      setMsg("Error: " + err.response?.data?.error || err.message);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Registro</Typography>
      <TextField
        fullWidth
        label="Nombre de Usuario"
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        fullWidth
        label="Contraseña"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        fullWidth
        label="Pregunta de seguridad"
        margin="normal"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <TextField
        fullWidth
        label="Respuesta"
        margin="normal"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <Button variant="contained" fullWidth onClick={handleRegister}>
        Registrarse
      </Button>

      <Button
        fullWidth
        variant="text"
        sx={{ mt: 1 }}
        onClick={() => navigate("/login")}
      >
        ¿Ya tienes cuenta? Iniciar sesión
      </Button>

      <Typography color="success.main" sx={{ mt: 2 }}>
        {msg}
      </Typography>
    </Box>
  );
}
