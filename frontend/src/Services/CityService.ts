import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { api } from "./api";
import { City, CityPost } from "../Models/City";
import { UserProfileToken } from "../Models/User";
import { useAuth } from "../Context/useAuth";

export const getAllCitiesApi = async () => {
  try {
    const result = await axios.get<City[]>(
      api + `cities`
    );
    return result;
  } catch (error) {
    handleError(error);
  }
};

export const getCityByIdApi = async (id: number | undefined) => {
  try {
    const result = await axios.get<City>(api + `cities/${id}`);
    return result;
  } catch (error) {
    handleError(error);
  }
};

export const postCityApi = async (
  names: string[],
  imageUrl: string,
  shortDesc: string,
  longDesc: string,
  contribution: string,
  categories: number[],
  coordinates: [number,number],
  token: string | null
) => {
  try {
    const result = await axios.post<CityPost>(api + `cities`, {
      names: names,
      imageUrl: imageUrl,
      shortDesc: shortDesc,
      longDesc: longDesc,
      contribution: contribution,
      categories: categories,
      coordinates: coordinates
    },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    return result;
  } catch (error) {
    handleError(error);
  }
};

export const deleteCityByIdApi = async (id: number) => {
  try {
    const result = await axios.delete(api + `cities/${id}`);
    return result;
  } catch (error) {
    handleError(error);
  }
};

export const updateCityApi = async (
    id: number,
  names: string[],
  imageUrl: string,
  shortDesc: string,
  longDesc: string,
  contribution: string,
  categories: number[],
  coordinates: [number,number]
) => {
  try {
    const result = await axios.put<CityPost>(api + `cities/${id}`, {
      names: names,
  imageUrl: imageUrl,
  shortDesc: shortDesc,
  longDesc: longDesc,
  contribution: contribution,
  categories: categories,
  coordinates: coordinates
    });
    return result;
  } catch (error) {
    handleError(error);
  }
};