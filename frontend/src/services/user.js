import axios from 'axios'
const baseUrl = '/api/users'

const create = async (newUser) => {
    const response = await axios.post(`${baseUrl}/signup`,newUser)
    return response.data
  }

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default {create}

