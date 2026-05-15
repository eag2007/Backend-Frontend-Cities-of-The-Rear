import axios from "axios";
import { UserProfileToken } from "../Models/User";
import { handleError } from "../Helpers/ErrorHandler";
import { api } from "./api";
import { number } from "yup";

export const loginAPI = async (email: string, password: string)=>{
    try {
        const data = await axios.post<UserProfileToken>(api+"Account/login",{
            email: email,
            password: password,
        });
        return data;
    } catch (error) {
        handleError(error)
        
        console.log(error)
    } 
}

export const registerAdminAPI = async (username: string,email: string, password: string)=>{
    try {
        const data = await axios.post<UserProfileToken>(api+"account/register-admin",{
            username: username,
            email: email,
            password: password,
        });
        return data;
    } catch (error) {
        handleError(error)
    } 
}

export const deleteAccountByIdApi = async (id:number)=>{
    try {
        const data = await axios.delete(api+`account/admin/${number}`);
        return data;
    } catch (error) {
        handleError(error)
    } 
}