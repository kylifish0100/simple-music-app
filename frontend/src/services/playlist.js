import axios from 'axios'
const baseUrl = '/api/musics'

let token = null

const setToken = newToken => {
   token = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUrl,config)
  return request.then(response => response.data)
}

const getOnePl = (name) => {
  const request = axios.get(`${baseUrl}/${name}`)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteSong = async (plname, songObject) => {
  const rec = {
    headers: { Authorization: token },
    data: songObject
  }
  const response = await axios.delete(`${baseUrl}/${plname}`, rec)
  return response.data
}

const deleteList = async (songObject) => {
  const rec = {
    headers: { Authorization: token },
    data: songObject
  }
  const response = await axios.delete(baseUrl, rec)
  return response.data
}

const listFilter = (list) =>{
  const reducer = (acc, cur) => {
    if(!acc.some(obj => obj.ListName === cur.ListName)) {
      acc.push(cur);
    }
    return acc;
  }
  var filtered = list.reduce(reducer,[]);
  return filtered
}

export default { getAll, create, update, getOnePl, setToken, deleteSong, deleteList, listFilter }
