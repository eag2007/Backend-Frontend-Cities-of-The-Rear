import { Category } from "./Category";

export type City={
    id: number;
    names: string[];
    imageUrl: string;
    shortDesc: string;
    longDesc: string;
    contribution: string;
    categories: number[];
    coordinates: [number, number]; // [широта, долгота]
}

export type CityPost={
    name: string;
    imageUrl: string;
    shortDesc: string;
    longDesc: string;
    contribution: string;
    categories: number[];
    coordinates: [number, number];
}