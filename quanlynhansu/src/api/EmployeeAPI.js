import apiService from "../services/APIservices";
const name = '/Employee'
export const GetEmployeeViews = (data) => {
    let str = `${name}/GetEmployeeViews?`
    if (data.nameSearch != "") str += `name=` + data.nameSearch + `&`
    if (data.departmentID != "") str += `departmentID=` + data.departmentID + `&`
    if (data.positionID != "") str += `positionID=` + data.positionID + `&`
    if (data.projectID != "") str += `projectID=` + data.projectID + `&`
    if (data.skillID != "") str += `skillID=` + data.skillID + `&`
    if (data.pageNum != "") str += `pageNum=` + data.pageNum + `&`
    if (data.pageSize != "") str += `pageSize=` + data.pageSize
    return apiService.get(str)
}
export const DeleteEmployee = (id) => {
    return apiService.delete(`${name}/DeleteEmployee?employeeId=` + id)
}
export const DeleteMultipleEmployees = (ids) => {
    return apiService.delete(`${name}/DeleteMultipleEmployees`, { data: ids })
}
export const GetDepartantList = () => {
    return apiService.get(`${name}/GetAllDepartment`)
}
export const UpdateSalary = (data) => {
    return apiService
        .put(`${name}/UpdateSalaryEmployee?employeeId=${data.employeeId}&salaryAmount=${data.salaryAmount}&startDate=${data.startDate}`)
}
export const UpdateProjectEmployee = (data) => {
    return apiService
        .put(`${name}/UpdateProjectEmployee?employeeId=${data.employeeId}&projectId=${data.projectId}&startDate=${data.startDate}`)
}
export const AddEmployee = (data) => {
    return apiService.post(`${name}/AddEmployee`, data)
}
export const GetEmployeeInProjectView = (id) => {
    return apiService.get(`${name}/GetEmployeeInProjectView?projectId=4${id}`)
}
export const AddEmployee_Project = (data) => {
    return apiService.post('Employee_Project/AddEmployee_Project', data)
}
export const DeleteEmployee_Project = (data) => {
    return apiService.post('Employee_Project/DeleteEmployee_Project', data)
}
