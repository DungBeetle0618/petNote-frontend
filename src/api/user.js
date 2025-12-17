import { api } from '../net/api'

export const getUser = () => 
    api.get('/api/user')