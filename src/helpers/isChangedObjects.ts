import _ from 'lodash'

export const isChangedObjects = (objects: any, array: any[]) => {
  for (let i = 0; i < array.length; i++) {
    const oldObj = objects[array[i]._id]
    if (!oldObj || !_.isEqual(oldObj, array[i])) return true
  }
  return false
}
