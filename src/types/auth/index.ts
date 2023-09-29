export type TUser = {
  email: string
  name: string
} | null

export type TAuthState = {
  authenticated: boolean
  user: TUser
  loading: boolean
}
export type TAuthAction =
  | { type: 'LOGIN'; payload: { user: TUser; token: string } }
  | { type: 'POPULATE'; payload: TUser }
  | { type: 'LOGOUT' }
  | { type: 'STOP_LOADING' }

export type TAuthDispatch = React.Dispatch<TAuthAction>
