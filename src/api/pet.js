import { api } from '../net/api.js'

//펫리스트 조회
export const getPetList = () =>
    api.get('/api/pet/listForAxios')

//펫상세 조회
export const getPetInfo = (petNo) => 
    api.get(`/api/pet/selectForAxios?petNo=${petNo}`)

//펫등록
export const insertPet = (data) =>
    api.post('/api/pet/insertForAxios', data, {headers: { 'Content-Type': 'application/json' }})