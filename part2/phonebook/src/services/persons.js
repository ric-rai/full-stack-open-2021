import ax from 'axios'
const url = 'http://localhost:3001/persons'
const pUrl = id => `${url}/${id}`

const getAll = () => ax.get(url).then(r => r.data)
const create = o => ax.post(url, o).then(r => r.data)
const del = id => ax.delete(pUrl(id)).then(r => r.data)
const update = (id, o) => ax.put(pUrl(id), o).then(r => r.data)

export default {getAll, create, del, update}