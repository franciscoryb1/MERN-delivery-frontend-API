import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Custom hook para obtener un usuario
export const useGetMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    // Funcion que va a devolver un dato de tipo User
    const getMyUserRequest = async (): Promise<User> => { 
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "content-type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get user');
        }

        return response.json();
    };

    const {
        data: currentUser, // Cambiar el nombre de data a currentUser
        isLoading,
        error
    } = useQuery("fetchCurrentUser", getMyUserRequest); // Cambiar el nombre de la query

    if (error) {
        toast.error(error.toString());
    }

    return { currentUser, isLoading };

};




// Custom hook para crear un usuario
type CreateUserRequest = {
    auth0Id: string;
    email: string;
};

export const useCreateMyuser = () => {

    const { getAccessTokenSilently } = useAuth0();

    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

    };

    const { mutateAsync:
        createUser,
        isLoading,
        isError,
        isSuccess
    } = useMutation(createMyUserRequest);

    return { createUser, isLoading, isError, isSuccess };

};


// Custom hook para actualizar un usuario
type UpdateMyUserRequest = {
    name: string;
    addressLine1: string;
    city: string;
    country: string;
};

export const useUpdateMyuser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to update user');
        }
        return response.json();
    };


    const { mutateAsync:
        updateUser,
        isLoading,
        isSuccess,
        error,
        reset
    } = useMutation(updateMyUserRequest);

    // Manejar errores y mensajes de éxito en el hook y no en el componente
    if (error) {
        toast.error(error.toString());
        reset();
    }

    if (isSuccess) {
        toast.success('User profile updated!');
    }

    return { updateUser, isLoading };

};