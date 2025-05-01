import { useGetMyRestaurant, useCreateMyRestaurant, useUpdateMyRestaurant, useGetMyRestaurantOrders } from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
    const { restaurant } = useGetMyRestaurant();
    const { createRestaurant, isLoading: isCreateloading } = useCreateMyRestaurant();
    const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();

    const { orders } = useGetMyRestaurantOrders();

    // cuando la pagina cargue por primera vez sin importar que haga el usuario, siempre va a intentar traer 'restaurant' con el GET
    // se verifica si hay un restaurant existente para el usuario
    const isEditing = !!restaurant; // si hay un restaurant, isEditing true, sino false

    return (

        <Tabs defaultValue="orders">
            <TabsList>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-5 pg-10 rounded-lg">
                <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
                {
                    orders?.map((order) => <OrderItemCard order={order} />)
                }
            </TabsContent>

            <TabsContent value="manage-restaurant" className="space-y-5 bg-gray-50 pg-10 rounded-lg">
                <ManageRestaurantForm
                    restaurant={restaurant}
                    onSave={isEditing ? updateRestaurant : createRestaurant}
                    isLoading={isCreateloading || isUpdateLoading} // isLoading espera un booleano, por lo que si uno de los dos es true, isLoading será true
                />
            </TabsContent>

        </Tabs>



    );
}

export default ManageRestaurantPage;