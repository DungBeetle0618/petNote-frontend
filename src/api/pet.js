import { api } from '../net/api.js'

//펫리스트 조회
export const getPetList = () =>
    api.get('/api/pet/listForAxios')

//펫상세 조회
export const getPetInfo = (petNo) => 
    api.get(`/api/pet/selectForAxios?petNo=${petNo}`)

//펫등록
export const insertPet = (data) =>
    api.post('/api/pet/insertForAxios', data, {headers: { 'Content-Type': 'multipart/form-data' }})

//펫정보 수정
export const updatePet = (data) =>
    api.post('/api/pet/updateForAxios', data, {headers: { 'Content-Type': 'multipart/form-data' }})

//펫 삭제
export const deletePet = (petNo) => 
    api.get(`/api/pet/deleteForAxios?petNo=${petNo}`)