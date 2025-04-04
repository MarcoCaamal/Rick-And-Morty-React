import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
  Paper,
  Avatar,
  CircularProgress,
  Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../contexts/AuthContext'; // Asume que tienes un contexto de autenticación

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Hook personalizado para autenticación

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      navigate('/'); // Redirige al dashboard después de login
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
  <Box
    sx={{
      height: '100%', // Para ocupar toda la altura del Grid
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', // Centra verticalmente
      alignItems: 'center', // Centra horizontalmente
      px: 4, // Padding horizontal
    }}
  >
    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Iniciar sesión
    </Typography>

    {error && (
      <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
        {error}
      </Alert>
    )}

    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Correo electrónico"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Contraseña"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{ mt: 3, mb: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Iniciar sesión'}
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="/forgot-password" variant="body2">
            ¿Olvidaste tu contraseña?
          </Link>
        </Grid>
        <Grid item>
          <Link href="/register" variant="body2">
            {"¿No tienes una cuenta? Regístrate"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  </Box>
</Grid>

  );
};