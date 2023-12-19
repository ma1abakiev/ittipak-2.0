import $api from '../../../App/http/auth'

export default class AuthService {
  static async login(email: string, password: string) {
    return $api.post('/login/', {
      email,
      password,
    })
  }
  static async logout() {
    return $api.post('/logout/')
  }
  static async register(
    username: string,
    email: string,
    password: string,
    password_confirm: string
  ) {
    return $api.post('/register/', {
      username,
      email,
      password,
      password_confirm,
    })
  }
}
