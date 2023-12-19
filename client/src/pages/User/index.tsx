import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setUser } from './slices/authSlice'
import AuthService from './services'
import { Button, Container, Grid, TextField, Typography } from '@mui/material'

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
      console.log(response.data)

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
  const handleLogin = async () => {
    try {
      const response = await AuthService.login(
        formData.email,
        formData.password
      )
      console.log(response)

      toast.success('Вы успешно Вошли')
    } catch (e) {
      console.log(`Ошибка Ошибка Ошибка ${e}`)
      toast.error('ошибочка')
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Регистрация
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            onChange={handleChange}
            value={formData.username}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="password"
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
          />
        </Grid>
      </Grid>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleRegistration}
      >
        Зарегистрироваться
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleLogin}
      >
        Войти
      </Button>
    </Container>
  )
}

export default RegistrationPage
