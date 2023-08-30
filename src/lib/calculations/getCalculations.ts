import { getRealEstateData } from '@/helpers'

export const getReport = async (id: string) => {
  try {
    const response = await getRealEstateData({
      method: 'GET',
      url: 'https://realty-in-us.p.rapidapi.com/properties/v3/detail',
      params: {
        property_id: id
      }
    })
    const { data } = response
    return Promise.resolve(data.home)
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}
