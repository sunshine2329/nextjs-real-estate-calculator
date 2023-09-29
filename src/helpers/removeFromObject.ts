import _ from 'lodash'

export const removeFromObject = (obj: any, key?: string | string[]) => {
  if (key === undefined) return obj
  if (typeof key === 'string') {
    return _.unset(obj, key)
  }
  const keys = key
  keys.forEach(key => _.unset(obj, key))
  return obj
}
