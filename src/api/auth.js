import { api } from '../net/api.js'

export const signUp = (body) => 
    api.post('/auth/signup', body)

export const login = (id, password) =>
    api.post('/auth/login', {id, password})

export const logout = () =>
    api.post('/auth/logout', {id, password})

export const refresh = () =>
    api.post('/auth/login', {})

export const checkUserId = (userId) =>
    api.get(`/auth/check-userId?userId=${userId}`)

export const sendFindIdCode = (email) =>
  api.get(`/auth/find-id/request?email=${email}`)

export const verifyFindIdCode = (email, code) =>
  api.post('/auth/find-id/verify', { email, code })

export const sendResetPwCode = (userId, email) =>
  api.post('/auth/reset-password/request', { userId, email })

export const verifyResetPwCode = (userId, email, code) =>
  api.post('/auth/reset-password/verify', { userId, email, code })

export const completeResetPw = (token, newPassword) =>
  api.post('/auth/reset-password/complete', { token, newPassword })