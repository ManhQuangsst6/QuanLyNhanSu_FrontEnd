import apiService from "../services/APIservices";
const name = '/Project'
export const GetProjects = (textSearch, monthSearch, yearSearch) => {
    let str = `${name}/GetProjects?`
    if (textSearch != "") str += `searchName=` + textSearch + `&`
    if (monthSearch != "") str += `monthSearch=` + monthSearch + `&`
    if (yearSearch != "") str += `yearSearch=` + yearSearch + `&`
    return apiService.get(str)
}
export const DeleteProject = (id) => {
    return apiService.delete(`${name}/DeleteProject?id=` + id)
}
export const AddProject = (data) => {
    return apiService.post(`${name}/AddProject`, data)
}
export const UpdateProject = (data) => {
    return apiService.put(`${name}/UpdateProject`, data)
}
export const UpdateComplete = (id) => {
    return apiService.put(`${name}/UpdateComplete?id=` + id)
}