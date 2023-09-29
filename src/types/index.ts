export * from './auth'
export * from './reports'

export type TAddressValues = {
  street: string
  city: string
  state: string
  postal_code: string
}

export type ColumnDef<T> = {
  header: string //header Text
  accessorKey: keyof T //key for how to get the value
  width?: number // column width
  isPinned?: boolean //column pinned state
  prefix?: string
  suffix?: string
}
