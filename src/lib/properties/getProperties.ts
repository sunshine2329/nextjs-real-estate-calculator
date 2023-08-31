import api from '../api'

export const getProperties = async (keyword: string) => {
  try {
    // Request the location endpoint to get location based on input keyword
    const location = await api.get(`/api/location`, keyword)
    // Extract city and state from the response
    const { city, state_code } = location.data.autocomplete.filter((data: any) => data.city)[0]
    // Request the properties endpoint to get available properties
    const res = await api.post(
      '/api/properties',
      {
        city,
        state_code
      } // Set parameters
    )
    const { data } = res
    return Promise.resolve(data.home_search.results)
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}
