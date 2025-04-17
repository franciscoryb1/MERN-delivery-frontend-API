import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestaurant } from "@/api/RestaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItemComponent from "@/components/MenuItemComponent";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { MenuItem } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}


const DetailPage = () => {
    // Hooks
    const { restaurantId } = useParams();
    const { restaurant, isLoading } = useGetRestaurant(restaurantId);
    const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession();

    const [cartItems, setCartItems] = useState<CartItem[]>(
        () => {
            const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
            return storedCartItems ? JSON.parse(storedCartItems) : [];
        }
    );

    const addToCart = (menuItem: MenuItem) => {
        setCartItems((prevCartItems) => {
            // 1) Verificar si el item ya está en el carrito
            const existingItem = prevCartItems.find(
                (item) => item._id === menuItem._id
            );

            let updatedCartItems;

            // 2) Si está, aumentar la cantidad
            if (existingItem) {
                updatedCartItems = prevCartItems.map((item) =>
                    item._id === menuItem._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // 3) Si no está, agregarlo al carrito
                updatedCartItems = [
                    ...prevCartItems,
                    { ...menuItem, quantity: 1 },
                ];
            }

            // 4) Guardar el carrito en sessionStorage para persistirlo entre recargas
            sessionStorage.setItem(
                `cartItems-${restaurantId}`,
                JSON.stringify(updatedCartItems)
            );

            return updatedCartItems;
        });
    };

    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter(
                (item) => cartItem._id !== item._id
            );

            // 4) Guardar el carrito en sessionStorage para persistirlo entre recargas
            sessionStorage.setItem(
                `cartItems-${restaurantId}`,
                JSON.stringify(updatedCartItems)
            );

            return updatedCartItems;
        });
    };

    const onCheckout = async (userFormData: any) => {
        if (!restaurant) {
            return;
        };

        const checkoutData = {
            cartItems: cartItems.map((cartItem) => ({
                menuItemId: cartItem._id,
                name: cartItem.name,
                quantity: cartItem.quantity.toString(),
            })),
            restaurantId: restaurant?._id,
            deliveryDetails: {
                name: userFormData.name,
                addressLine1: userFormData.addressLine1,
                city: userFormData.city,
                country: userFormData.country,
                email: userFormData.email as string
            }
        };

        const data = await createCheckoutSession(checkoutData);

        window.location.href = data.url;
    };

    if (isLoading || !restaurant) {
        return "Loading...";
    }

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 4}>
                <img
                    src={restaurant.imageUrl}
                    className="rounded-md object-cover h-full w-full"
                />
            </AspectRatio>

            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">

                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((menuItem) => (
                        <MenuItemComponent key={menuItem._id} menuItem={menuItem} addToCart={() => addToCart(menuItem)} />
                    ))}
                </div>

                <Card>
                    <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart} />

                    <CardFooter className="">
                        <CheckoutButton
                            disabled={cartItems.length === 0}
                            onCheckout={onCheckout}
                            isLoading={isCheckoutLoading}
                        />
                    </CardFooter>

                </Card>
                <div>

                </div>

            </div>

        </div>
    )

};

export default DetailPage;