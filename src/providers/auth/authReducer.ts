import api from '@/lib/api'
import { TAuthAction, TAuthState, TUser } from '@/types/auth'

api.setConfigure({
  baseURL: process.env.BASE_URL!,
  headers: { common: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } }
})

const authReducer = (state: TAuthState, action: TAuthAction): TAuthState => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload.token)
      api.setHeaderToken(action.payload.token)
      return {
        ...state,
        authenticated: true,
        user: action.payload.user
      }
    case 'LOGOUT':
      localStorage.removeItem('token')
      api.setHeaderToken()
      return {
        ...state,
        authenticated: false,
        user: null
      }
    case 'POPULATE':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        } as TUser
      }
    case 'STOP_LOADING':
      return {
        ...state,
        loading: false
      }
    default:
      throw new Error('Unknown action type')
  }
}

export default authReducer
