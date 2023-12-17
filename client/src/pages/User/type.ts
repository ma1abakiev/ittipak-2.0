export interface Tokens {
  refresh: string
  access: string
}

export interface AuthState {
  id: number | null
  email: string
  nickname: string
  first_name: string
  last_name: string
  phone_number: string
  profile_photo: string
  tokens: Tokens
}
