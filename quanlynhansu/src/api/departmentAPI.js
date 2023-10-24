import apiService from "../services/APIservices";
const name = '/Department'
export const GetAllDepartment = () => {
    return apiService.get(`${name}/GetAllDepartment`)
}