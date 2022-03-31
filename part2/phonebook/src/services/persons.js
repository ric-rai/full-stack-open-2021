import axios from 'axios'
const url = '/api/persons'
const pUrl = id => `${url}/${id}`

const getAll = () => axios.get(url).then(r => r.data)
const create = obj => axios.post(url, obj).then(r => r.data)
const del = id => axios.delete(pUrl(id)).then(r => r.data)
const update = obj => axios.put(pUrl(obj.id), obj).then(r => r.data)

export default {getAll, create, del, update}