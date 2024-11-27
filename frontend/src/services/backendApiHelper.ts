import apiService from "./apiService"
import * as url from "./apiUrl"

export const register = async (data: any) => await apiService.post(url.REGISTER, data);
export const login = async (data: any) => await apiService.post(url.LOGIN, data);

