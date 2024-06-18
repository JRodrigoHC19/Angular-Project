export interface LoginResponse {
 token: Tokens,
 msg: string,
}

interface Tokens {
  refresh: string,
  access: string
}
