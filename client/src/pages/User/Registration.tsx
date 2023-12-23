import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setUser } from './slices/authSlice'
import AuthService from './services'
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
  })

  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }
  const handleRegistration = async () => {
    try {
      const response = await AuthService.register(
        formData.username,
        formData.email,
        formData.password,
        formData.password_confirm
      )

      dispatch(
        setUser({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          tokens: response.data.tokens,
        })
      )

      toast.success('Вы успешно зарегистрировались!')
    } catch (e) {
      toast.error('Ошибка при регистрации. Пожалуйста, проверьте данные.')
      console.log(e)
    }
  }

  return (
    <Container sx={{ mt: 10 }} component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <Grid sx={{ mt: 2 }} container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              onChange={handleChange}
              value={formData.username}
              required
            />
          </Grid>
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password repeat"
              name="password_confirm"
              type="password"
              onChange={handleChange}
              value={formData.password_confirm}
              required
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleRegistration}
          sx={{ mt: 3, p: 2 }}
        >
          Зарегистрироваться
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <Link style={{ color: 'blue' }} to={'/login'}>
            Уже есть Аккаунт?
          </Link>
        </Box>
      </Paper>
    </Container>
  )
}

export default RegistrationPage
