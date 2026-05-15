import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { api } from "./api";
import { City, CityPost } from "../Models/City";

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
  name: string,
  imageUrl: string,
  shortDesc: string,
  longDesc: string,
  contribution: string,
  categories: number[],
  coordinates: [number,number]
) => {
  try {
    const result = await axios.post<CityPost>(api + `cities`, {
      name: name,
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
  name: string,
  imageUrl: string,
  shortDesc: string,
  longDesc: string,
  contribution: string,
  categories: number[],
  coordinates: [number,number]
) => {
  try {
    const result = await axios.put<CityPost>(api + `cities/${id}`, {
      name: name,
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