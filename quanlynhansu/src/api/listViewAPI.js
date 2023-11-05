import apiService from "../services/APIservices";
const name = '/ListView'
export const GetView_DepartmentList = () => {
    return apiService.get(`${name}/GetView_DepartmentList`)
}
export const GetView_ProjectList = () => {
    return apiService.get(`${name}/GetView_ProjectList`)
}
export const GetView_SkillList = () => {
    return apiService.get(`${name}/GetView_SkillList`)
}
export const GetView_PositionList = () => {
    return apiService.get(`${name}/GetView_PositionList`)
}