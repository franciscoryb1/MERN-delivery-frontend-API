import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Siempre que se use GET se usa useQuery
// Siempre que se use POST o PUT se usa useMutation

// Hook para obtener el restaurante del usuario
export const useGetMyRestaurant = () => {

    const { getAccessTokenSilently } = useAuth0();

    const getMyRestaurantRequest = async (): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch restaurant data');
        }

        return response.json();
    };

    const { data: restaurant, isLoading } = useQuery(
        'fetchMyRestaurant',
        getMyRestaurantRequest
    );

    return {
        restaurant,
        isLoading
    };

};


// Hook para crear un restaurante
export const useCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    // con Promise<Restaurant> ayudo a que cuando se use el componente se sepa que tipo de dato va a retornar
    const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        // console.log(accessToken);

        const formDataObj: Record<string, any> = {};
        restaurantFormData.forEach((value, key) => {
            formDataObj[key] = value;
        });

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: restaurantFormData
        });

        if (!response.ok) {
            const errorData = await response.json();
            // throw new Error(errorData.message);
            throw new Error(errorData.message);
        }

        return response.json();
    };

    const {
        mutate: createRestaurant,
        isLoading,
        isSuccess,
        error
    } = useMutation(createMyRestaurantRequest);

    if (isSuccess) {
        toast.success('Restaurant created');
    }

    if (error instanceof Error) {
        // Ahora TypeScript sabe que 'error' es una instancia de Error, por lo que tiene la propiedad 'message'
        toast.error(error.message || 'Failed to create restaurant');
    }

    return {
        createRestaurant,
        isLoading
    };
};


// Hook para actualizar un restaurante
export const useUpdateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: restaurantFormData
        });

        if (!response) {
            throw new Error('Failed to update restaurant');
        }

        return response.json();
    };

    const { mutate: updateRestaurant,
        isLoading,
        isSuccess,
        error
    } = useMutation(updateMyRestaurantRequest);

    if (isSuccess) {
        toast.success('Restaurant updated');
    }

    if (error instanceof Error) {
        toast.error(error.message || 'Failed to update restaurant');
    }

    return { updateRestaurant, isLoading };
};


export const useGetMyRestaurantOrders = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                contentType: 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch restaurant orders');
        }

        return response.json();
    };

    const { data: orders, isLoading } = useQuery(
        'fetchMyRestaurantOrders',
        getMyRestaurantOrdersRequest
    );

    return {
        orders,
        isLoading
    };
};