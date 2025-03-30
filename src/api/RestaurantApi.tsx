import { RestaurantSearchResponse } from "@/types";
import e from "express";
import { useQuery } from "react-query";
import { data } from "react-router-dom";

// Todos los hooks y requests para comunicarse con el backend al endpoint del Restaurant
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useSearchRestaurants = (city?: string) => {
    // Hook para buscar restaurantes por ciudad
    // Se usa el hook useQuery de react-query para hacer la peticion al backend y obtener los restaurantes
    const createSearchrequest = async (): Promise<RestaurantSearchResponse> => {
        const response = await fetch(
            `${API_BASE_URL}/api/restaurant/search/${city}`
        );

        if (!response) {
            throw new Error("Failed to get restaurant");
        };

        return response.json();
    };

    const { data: results, isLoading } = useQuery(
        ["searchRestaurants"],
        createSearchrequest,
        {
            enabled: !!city, // Solo se ejecuta si city no es undefined
        }
    );

    return {
        results, isLoading
    }

};