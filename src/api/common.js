import { api } from '../net/api.js'

export const getCommonCode = (group1, group2) =>
    api.get(`/api/common/selectListForAxios?codeGroup1=${group1}&codeGroup2=${group2}`)