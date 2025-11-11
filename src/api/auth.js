import { api } from '../net/api.js'

export const signUp = (body) => 
    api.post('/auth/signup', body)

export const login = (id, password) =>
    api.post('/auth/login', {id, password})

export const logout = () =>
    api.post('/auth/logout', {id, password})

export const refresh = () =>
    api.post('/auth/login', {})