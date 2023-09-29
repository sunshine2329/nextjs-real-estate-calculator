import { TObject } from './TObject'

export type TAddress = {
  street: string
  city: string
  state: string
  postal_code: string
}
type TReport = TObject & {
  address: TAddress
  scenarios: string[]
  created: string
  updated: string
}

export default TReport
