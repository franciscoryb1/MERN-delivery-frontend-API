import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@radix-ui/react-separator";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import CuisinesSection from "./CousinesSection";

const formSchema = z.object({
    restaurantName: z.string({
        required_error: "Restaurant name is required",
    }),
    city: z.string({
        required_error: "Restaurant city is required",
    }),
    country: z.string({
        required_error: "Country is required",
    }),
    deliveryPrice: z.coerce.number({
        required_error: "Delivery price is required",
        invalid_type_error: "Must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "Estimated delivery time is required",
        invalid_type_error: "Must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "Please select al least one item",
    }),
    menuItems: z.array(
        z.object({
            name: z.string().min(1, "name is required"),
            price: z.coerce.number().min(1, "Price is required"),
        })
    ),
    imageFile: z.instanceof(File, { message: "Image is required" })
});

type RestaurantFormData = z.infer<typeof formSchema>;


type Props = {
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
}

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          restaurantName: "", // Evita que sea undefined
          city: "",
          country: "",
          deliveryPrice: 0, // Si es numérico, mejor usar 0
          estimatedDeliveryTime: 0, // Igual aquí
          cuisines: [],
          menuItems: [{ name: "", price: 0 }],
        },
      });
      

    // Cuando el codigo del form onSubmit llega aca es porque ya paso las validaciones de zod
    const onSubmit = (formDataJson: RestaurantFormData) => {
        const formData = new FormData();

        formData.append("restaurantName", formDataJson.restaurantName);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);

        formData.append(
            "deliveryPrice",
            (formDataJson.deliveryPrice * 100).toString()
        );
        formData.append(
            "estimatedDeliveryTime",
            formDataJson.estimatedDeliveryTime.toString()
        );
        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine);
        });
        formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name);
            formData.append(
                `menuItems[${index}][price]`,
                (menuItem.price * 100).toString()
            );
        });

        if (formDataJson.imageFile) {
            formData.append(`imageFile`, formDataJson.imageFile);
        }

        onSave(formData);
    };

    return (
        <Form {...form}>
            {/* handleSubmit pasa las validaciones de zod, si todo esta bien se ejecuta el onSubmit */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
                <DetailsSection />
                <Separator />
                <CuisinesSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />

                {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}

            </form>
        </Form>
    )

}

export default ManageRestaurantForm;