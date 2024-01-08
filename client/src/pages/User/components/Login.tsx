import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { Box } from '@mui/system'
import { useDispatch } from 'react-redux'
import { setUser } from '../slices/authSlice'
import authService from '../services/authService'
import { AuthState } from '../types/type'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (user && user.tokens) {
      navigate('/home')
    }
  }, [user, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleLogin = async () => {
    try {
      const response = await authService.login(
        formData.email,
        formData.password
      )
      dispatch(
        setUser({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          tokens: response.data.tokens,
        })
      )

      toast.success('Вы успешно вошли')
      navigate('/home') // Перенаправляем пользователя после успешного входа
    } catch (e) {
      console.log(`Ошибка: ${e}`)
      toast.error('Произошла ошибка')
    }
  }

  return (
    <Container sx={{ mt: 10 }} component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <Grid sx={{ mt: 2 }} container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              onChange={handleChange}
              value={formData.password}
              required
              // tabIndex={3}
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ mt: 3, p: 2 }}
        >
          Войти
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <Link style={{ color: 'primary' }} to={'/registration'}>
            Нет Аккаунта?
          </Link>
        </Box>
      </Paper>
    </Container>
  )
}

export default LoginPage
