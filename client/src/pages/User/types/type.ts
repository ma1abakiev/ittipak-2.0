export interface Tokens {
  refresh: string
  access: string
}

export interface AuthState {
  id: number | null
  email: string
  username: string
  tokens: Tokens
}
