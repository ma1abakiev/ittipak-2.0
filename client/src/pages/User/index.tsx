import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setUser } from './slices/authSlice'
import AuthService from './services'

const UserPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async () => {
    try {
      const response = await AuthService.login(email, password)
      console.log(response.data)
      dispatch(
        setUser({
          id: response.data.id,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          nickname: response.data.nickname,
          phone_number: response.data.phone_number,
          profile_photo: response.data.profile_photo,
          email: response.data.email,
          tokens: response.data.tokens,
        })
      )

      toast.success('Вы успешно авторизовались!')
    } catch (e) {
      toast.error('Проверьте правильность логина или пароля!')
      console.log(e)
    }
  }

  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : {}
  return (
    <div className="container">
      <div className="auth__content">
        <div className="auth__content-form">
          <h2 className="auth__form-title">Вход в систему</h2>
          <div className="auth__form-box">
            <label htmlFor="email-input">Email</label>
            <input
              type="email"
              id="email-input"
              className="auth__form-email"
              placeholder="youremail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth__form-box">
            <label htmlFor="password-input">Пароль</label>
            <div className="auth__input-password">
              <input
                type="password"
                id="password-input"
                className="auth__form-pass"
                placeholder="Ваш пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="auth__submit-btn" onClick={() => handleLogin()}>
            Войти
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserPage
