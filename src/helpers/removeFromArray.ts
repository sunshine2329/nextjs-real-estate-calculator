import _ from 'lodash'

export const removeFromArray = (array: string[], value: string) => _.remove(array, x => x === value)
