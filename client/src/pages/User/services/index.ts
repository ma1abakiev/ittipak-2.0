import axios from 'axios'
import $api from '../../../App/http/auth'

export default class AuthService {
  static async login(email: string, password: string) {
    return axios.post('http://localhost:8000/api/user/login/', {
      email,
      password,
    })
  }
  static async logout() {
    return $api.post('user/logout/')
  }
}
