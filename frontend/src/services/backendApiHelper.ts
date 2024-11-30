import apiService from "./apiService"
import * as url from "./apiUrl"

export const register = async (data: any) => await apiService.post(url.REGISTER, data);
export const login = async (data: any) => await apiService.post(url.LOGIN, data);
export const getUserlist = async (data: any) => {
  const result = await apiService.get(url.USER_LIST, data);
  return result;
};

export const updateUserList = async (data: any) => await apiService.put(url.USER_LIST, data);
export const deleteUserList = async (data: any) => await apiService.delete(url.USER_LIST, { headers: { data } });

// Task

// Task List

export const getTask = async (data?: any) => {
  console.log("da: ", data);
  const result = await apiService.get(url.TASK_URL, data || {});
  console.log("res: ", result);
  return result;
};

export const addTask = async (data: any) => {
  return await apiService.post(url.TASK_URL, data);
};

export const updateTask = async (taskId: string, updatedTask: any) => {
  const result = await apiService.put(`${url.TASK_URL}/${taskId}`, updatedTask);
  return result;
};


export const deleteTask = async (data: any) => {
  return await apiService.delete(url.TASK_URL, { data });
}



// Task List

export const getTaskList = async (data: any) => {
  console.log("da: ", data)
  const result = await apiService.get(url.TASK_LIST, data);
  console.log("res: ", result)
  return result;
};
export const addTaskList = async (data: any) => await apiService.post(url.TASK_LIST, data);


export const updateTaskList = async (data: any) => await apiService.put(url.TASK_LIST, data);
export const deleteTaskList = async (data: any) => await apiService.delete(url.TASK_LIST, { headers: { data } });
