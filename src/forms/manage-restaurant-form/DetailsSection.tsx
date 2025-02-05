import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const DetailsSection = () => {

    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            <div>
                <h2 className="txt-2xl font-bold">Details</h2>
                <FormDescription>
                    Enter the details about your restaurant
                </FormDescription>
            </div>

            {/* RESTAURANT NAME */}
            <FormField
                control={control}
                name="restaurantName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>)}
            />

            {/* CITY Y COUNTRY */}
            <div className="flex gap-4">
                {/* CITY */}
                <FormField
                    control={control}
                    name="city"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)}
                />
                {/* COUNTRY */}
                <FormField
                    control={control}
                    name="country"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)}
                />
            </div>

            {/* DELIVERY PRICE */}
            <FormField
                control={control}
                name="deliveryPrice"
                render={({ field }) => (
                    <FormItem className="max-w-[25%]">
                        <FormLabel>Delivery Price ($)</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="1.50" className="bg-white" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>)}
            />

            {/* DELIVERY TIME */}
            <FormField
                control={control}
                name="estimatedDeliveryTime"
                render={({ field }) => (
                    <FormItem className="max-w-[25%]">
                        <FormLabel>Estimated Delivery Time (minutes)</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="30" className="bg-white" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>)}
            />

        </div>
    );
};

export default DetailsSection;