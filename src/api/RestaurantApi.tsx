import { SearchState } from "@/pages/SearchPage";
import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

// Todos los hooks y requests para comunicarse con el backend al endpoint del Restaurant
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useSearchRestaurants = (searchState: SearchState, city?: string) => {
    // Hook para buscar restaurantes por ciudad
    // Se usa el hook useQuery de react-query para hacer la peticion al backend y obtener los restaurantes
    const createSearchrequest = async (): Promise<RestaurantSearchResponse> => {

        const params = new URLSearchParams();
        params.set("searchQuery", searchState.searchQuery); // Agrega la consulta de búsqueda a los parámetros de la URL
        params.set("page", searchState.page.toString()); // Agrega la página a los parámetros de la URL
        params.set("selectedCuisines", searchState.selectedCuisines.join(",")); // Agrega las cocinas seleccionadas a los parámetros de la URL
        params.set("sortOption", searchState.sortOption || ""); // Agrega la opción de ordenamiento a los parámetros de la URL

        const response = await fetch(
            `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
        );

        if (!response) {
            throw new Error("Failed to get restaurant");
        };

        return response.json();
    };

    const { data: results, isLoading } = useQuery(
        ["searchRestaurants", searchState], // cada vez que cambie el searchState se vuelve a ejecutar la query
        createSearchrequest,
        {
            enabled: !!city, // Solo se ejecuta si city no es undefined
        }
    );

    return {
        results, isLoading
    }

};