import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@radix-ui/react-separator";
import CousinesSection from "./CousinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";

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
    cousines: z.array(z.string()).nonempty({
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
    islLoading: boolean;
}

const ManageRestaurantForm = ({ onSave, islLoading }: Props) => {
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cousines: [],
            menuItems: [{ name: "", price: 0 }],
        }
    });

    // Cuando el codigo del form onSubmit llega aca es porque ya paso las validaciones de zod
    const onSubmit = (formDataJson: RestaurantFormData) => {
        // convert formDataJson to FormData object
        const formData = new FormData();

        formData.append("restaurantName", formDataJson.restaurantName);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        // Por convencion general se envia el precio en la menor denominacion de la moneda (centavos)
        formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString());
        formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString());
        formDataJson.cousines.forEach((cousine, index) => {
            formData.append(`cousines[${index}]`, cousine)
        });
        formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name);
            formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString());
        });
        formData.append("imageFile", formDataJson.imageFile);

        onSave(formData);
    };

    return (
        <Form {...form}>
            {/* handleSubmit pasa las validaciones de zod, si todo esta bien se ejecuta el onSubmit */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
                <DetailsSection />
                <Separator />
                <CousinesSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />

                {islLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}

            </form>
        </Form>
    )

}

export default ManageRestaurantForm;