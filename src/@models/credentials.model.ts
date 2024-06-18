export interface Credentials {
  email: string,
  password: string
}

export interface NewCredentials {
  name: string,
  email: string,
  password: string,
  password2: string,
  tc: boolean
}
