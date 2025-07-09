import { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", { username, password });
      localStorage.setItem("token", res.data.token); // guardar token
      navigate("/autores"); // redirige a vista principal
    } catch (err) {
      setMsg("Error: " + err.response?.data?.error || err.message);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Iniciar Sesión</Typography>
      <TextField
        fullWidth
        label="Usuario"
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        fullWidth
        type="password"
        label="Contraseña"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" fullWidth onClick={handleLogin}>
        Ingresar
      </Button>

      <Button
        fullWidth
        variant="text"
        sx={{ mt: 1 }}
        onClick={() => navigate("/recover")}
      >
        ¿Olvidaste tu contraseña?
      </Button>

      <Button
        fullWidth
        variant="text"
        sx={{ mt: 1 }}
        onClick={() => navigate("/register")}
      >
        ¿No tienes cuenta? Registrarse
      </Button>

      <Typography color="error" sx={{ mt: 2 }}>
        {msg}
      </Typography>
    </Box>
  );
}
