import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@radix-ui/react-separator";
import CousinesSection from "./CousinesSection";
import MenuSection from "./MenuSection";

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

type restaurantFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (restaurantFormData: FormData) => void;
    islLoading: boolean;
}


const ManageRestaurantForm = ({ onSave, islLoading }: Props) => {
    const form = useForm<restaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cousines: [],
            menuItems: [{ name: "", price: 0 }],
        }
    });

    // Cuando el codigo del form onSubmit llega aca es porque ya paso las validaciones de zod
    const onSubmit = (formDataJson: restaurantFormData) => {
        // TODO - convert formDataJson to FormData object
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
            </form>
        </Form>
    )

}

export default ManageRestaurantForm;