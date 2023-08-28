import axios from 'axios'

type TParamType = string | null
export const getProperties = async (keyword?: TParamType) => {
  try {
    // Request the location endpoint to get location based on input keyword
    const location = await axios.get('/api/location', {
      params: { keyword }
    })
    // Extract city and state from the response
    const { city, state_code } = location.data.autocomplete.filter((data: any) => data.city)[0]
    console.log(city, state_code)
    // Request the properties endpoint to get available properties
    const res = await axios.post(
      '/api/properties',
      {
        city,
        state_code
      } // Set parameters
    )
    const { data } = res
    console.log(res)
    return Promise.resolve(data.home_search.results)
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}
