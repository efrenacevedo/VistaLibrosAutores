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

    const { token, refreshToken, expiration } = res.data;

    // Guardar tokens y fecha de expiración
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("tokenExpiration", expiration);

    console.log("Token recibido:", token); // 👈 Aquí está el log en consola

    scheduleTokenRefresh(); // inicia el auto refresh
    navigate("/autores");
  } catch (err) {
    setMsg("Error: " + (err.response?.data?.error || err.message));
  }
};


  // Refrescar token automáticamente antes de que expire
  const scheduleTokenRefresh = () => {
    const expiration = new Date(localStorage.getItem("tokenExpiration"));
    const now = new Date();
    const timeUntilRefresh = expiration - now - 60000; // 1 min antes de expirar

    if (timeUntilRefresh > 0) {
      setTimeout(async () => {
        try {
          const res = await api.post("/auth/refresh", {
            refreshToken: localStorage.getItem("refreshToken"),
          });

          const { token, refreshToken, expiration } = res.data;
          localStorage.setItem("token", token);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("tokenExpiration", expiration);

          scheduleTokenRefresh(); // programar siguiente renovación
        } catch (err) {
          console.error("Error al renovar el token:", err);
          setMsg("Tu sesión ha expirado. Inicia sesión nuevamente.");
        }
      }, timeUntilRefresh);
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

      <Button fullWidth variant="text" sx={{ mt: 1 }} onClick={() => navigate("/recover")}>
        ¿Olvidaste tu contraseña?
      </Button>
      <Button fullWidth variant="text" sx={{ mt: 1 }} onClick={() => navigate("/register")}>
        ¿No tienes cuenta? Registrarse
      </Button>

      <Typography color="error" sx={{ mt: 2 }}>
        {msg}
      </Typography>
    </Box>
  );
}
