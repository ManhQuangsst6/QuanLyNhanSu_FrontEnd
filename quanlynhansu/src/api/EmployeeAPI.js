import apiService from "../services/APIservices";
const name = '/Employee'
export const GetEMployeeInProject = () => {
    return apiService.get(`${name}/GetAllDepartment`)
}
export const GetDepartMantList = () => {
    return apiService.get(`${name}/GetAllDepartment`)
}
export const GetDepartantList = () => {
    return apiService.get(`${name}/GetAllDepartment`)
}