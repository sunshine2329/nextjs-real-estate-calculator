import axios from 'axios'
export async function getRealEstateData({
  url,
  method = 'GET',
  params,
  data
}: {
  url: string
  method: string
  params?: { [key: string]: any }
  data?: { [key: string]: any }
}) {
  const options: any = {
    method,
    url,
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY
    }
  }
  if (data) options.data = data
  if (params) options.params = params

  try {
    const response = await axios.request(options)
    return Promise.resolve(response.data)
  } catch (error: any) {
    return Promise.reject(error)
  }
}
