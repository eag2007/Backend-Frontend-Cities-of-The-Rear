import axios from "axios";
import { UserProfile } from "../Models/User";
import { api } from "./api";
import { handleError } from "../Helpers/ErrorHandler";

export const getAllAdminsApi = async () => {
  try {
    const result = await axios.get<UserProfile[]>(
      api + `cities`
    );
    return result;
  } catch (error) {
    handleError(error);
  }
};