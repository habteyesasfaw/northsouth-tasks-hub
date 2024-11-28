import apiService from "./apiService"
import * as url from "./apiUrl"

export const register = async (data: any) => await apiService.post(url.REGISTER, data);
export const login = async (data: any) => await apiService.post(url.LOGIN, data);
export const getUserlist = async (data: any) => {
    const result = await apiService.get(url.USER_LIST, data);
    return result;
  };

  export const updateUserList = async (data: any) =>await apiService.put(url.USER_LIST, data);
  export const deleteUserList = async (data: any) =>await apiService.delete(url.USER_LIST, { headers: { data } });

  // Task List

  export const getTaskList = async (data: any) => {
    const result = await apiService.get(url.TASK_LIST, data);
    return result;
  };
  export const addTaskList = async (data: any) =>await apiService.post(url.TASK_LIST, data);


  export const updateTaskList = async (data: any) =>await apiService.put(url.TASK_LIST, data);
  export const deleteTaskList = async (data: any) =>await apiService.delete(url.TASK_LIST, { headers: { data } });
