import apiService from "../services/APIservices";
const name = '/Employee'
export const GetEMployeeInProject = () => {
    return apiService.get(`${name}/GetAllDepartment`)
}