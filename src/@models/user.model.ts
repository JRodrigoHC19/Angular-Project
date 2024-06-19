export interface User {
  id: number,
  name: string,
  is_admin: number,
  email: string,
}

export interface User_Channel {
  id?: number,
  user_id: number,
  nameChannel: string
}
