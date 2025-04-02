import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";


type Props = {
    onChange: (value: string) => void;
    sortOption: string; // The current sort option
};

const SORT_OPTIONS = [
    {
        label: 'Best Match',
        value: 'bestMatch'
    },
    {
        label: 'Delivery Price',
        value: 'deliveryPrice'
    },
    {
        label: 'Estimated Delivery Time',
        value: 'estimatedDeliveryTime'
    }
];

const SortOptionDropdown = ({ onChange, sortOption }: Props) => {

    const selectedSortLabel = SORT_OPTIONS.find((option) => option.value === sortOption)?.label || SORT_OPTIONS[0].label;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
                <Button variant="outline" className="w-full">
                    Sort by: {selectedSortLabel}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {
                    SORT_OPTIONS.map((option) => (
                        <DropdownMenuItem
                            key={option.value}
                            className="cursor-pointer"
                            onClick={() => onChange(option.value)}
                        >
                            {option.label}
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>

        </DropdownMenu>
    )
}

export default SortOptionDropdown;