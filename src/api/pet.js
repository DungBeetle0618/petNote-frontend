import { api } from '../net/api.js'

//펫리스트 조회
export const getPetList = () =>
    api.get('/api/pet/listForAxios')

//펫상세 조회
export const getPetInfo = (petNo) => 
    api.get(`/api/pet/selectForAxios?petNo=${petNo}`)