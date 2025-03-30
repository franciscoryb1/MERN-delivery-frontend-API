import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

type Props = {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
}

const PaginationSelector = ({ page, pages, onPageChange }: Props) => {

    const pageNumers = [];
    // pages = 3
    // pageNumers = [1, 2, 3]
    for (let i = 1; i <= pages; i++) {
        pageNumers.push(i);
    }

    return (
        <Pagination>
            <PaginationContent>


                {page !== 1 &&
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={() => onPageChange(page - 1)} />
                    </PaginationItem>
                }


                {pageNumers.map((number) => (
                    <PaginationItem key={number}>
                        <PaginationLink href="#" onClick={() => onPageChange(number)} isActive={number === page}>
                            {number}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {page !== pageNumers.length && (
                    <PaginationItem>
                        <PaginationNext href="#" onClick={() => onPageChange(page + 1)} />
                    </PaginationItem>
                )}



            </PaginationContent>
        </Pagination>
    )
}

export default PaginationSelector;