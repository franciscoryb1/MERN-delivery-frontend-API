import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
    cousine: string;
    field: ControllerRenderProps<FieldValues, "cousines">;
}

const CousineCheckbox = ({ cousine, field }: Props) => {
    return (
        <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
            <FormControl>
                <Checkbox
                    className="bg-white"
                    checked={field.value.includes(cousine)}
                    onCheckedChange={(checked) => {
                        { /* Aca me llega el nuevo valor de checked */ }
                        if (checked) {
                            {/* Si es checkeado, lo agrego a la lista de los seleccionados */ }
                            field.onChange([...field.value, cousine]);
                        } else {
                            {/* Si es descheckeado, filtro y actualizo la lista sin el valor que se descheckeo */ }
                            field.onChange(field.value.filter((value: String) => value !== cousine));
                        }
                    }}
                />
            </FormControl>
            <FormLabel className="text-sm font-normal">{cousine}</FormLabel>
        </FormItem>
    );
}

export default CousineCheckbox;