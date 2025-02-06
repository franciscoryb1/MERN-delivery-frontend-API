import { useGetMyRestaurant, useCreateMyRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
    const { restaurant } = useGetMyRestaurant();
    const { createRestaurant, isLoading: isCreateloading } = useCreateMyRestaurant();
    const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();

    // cuando la pagina cargue por primera vez sin importar que haga el usuario, siempre va a intentar traer 'restaurant' con el GET
    // se verifica si hay un restaurant existente para el usuario
    const isEditing = !!restaurant; // si hay un restaurant, isEditing true, sino false

    return (
        <ManageRestaurantForm
            restaurant={restaurant}
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isCreateloading || isUpdateLoading} // isLoading espera un booleano, por lo que si uno de los dos es true, isLoading será true
        />
    );
}

export default ManageRestaurantPage;