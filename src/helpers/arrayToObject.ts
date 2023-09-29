import { TObject } from '@/types'
import _ from 'lodash'

export const arrayToObject = (array: TObject[]) =>
  _.reduce(array, (acc, item) => ({ ...acc, [item._id]: item }), {})
