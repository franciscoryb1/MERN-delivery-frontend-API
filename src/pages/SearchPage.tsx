import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";


export type SearchState = {
    searchQuery: string;
    page: Number;
    selectedCuisines: string[];
    sortOption?: string;
}


const SearchPage = () => {
    const { city } = useParams(); // city porque asi lo llame en AppRoutes.tsx al definir la ruta

    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "", // Estado inicial de la búsqueda
        page: 1, // Página inicial
        selectedCuisines: [],
        sortOption: 'bestMatch'
    });

    // Estado para controlar la expansión del filtro de cocina
    const [isExpanded, setIsExpanded] = useState<boolean>(false);





    const setSortOption = (sortOption: string) => {
        setSearchState(() => ({
            ...searchState,
            sortOption, // Actualiza el estado con la nueva opción de ordenamiento
            page: 1, // Reinicia la página a 1 al cambiar la opción de ordenamiento
        }))
    };

    const setSelectedCuisines = (selectedCuisines: string[]) => {
        setSearchState((prevState) => ({
            ...prevState, // Copia todo el estado anterior
            selectedCuisines, // Actualiza el estado con las nuevas cocinas seleccionadas
            page: 1, // Reinicia la página a 1 al seleccionar nuevas cocinas
        }));
    };

    // Se usa para la paginacion, cuando se cambia de pagina se actualiza el estado con la nueva pagina
    const setPage = (page: number) => {
        setSearchState((setSearchState) => ({
            ...setSearchState,
            page, // Actualiza el estado con la nueva página
        }));
    };

    // Se llama cuando se envía el formulario de búsqueda
    // Se usa para actualizar el estado con la nueva consulta de búsqueda
    const setSearchQuery = (searchFormData: SearchForm) => {
        // Copia todo el estado anterior y actualiza solo la propiedad searchQuery
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery, // Actualiza el estado con la nueva consulta de búsqueda,
            page: 1, // Reinicia la página a 1 al realizar una nueva búsqueda
        }))
    }

    // Función para restablecer la búsqueda a su estado inicial
    // Se llama cuando se hace clic en el botón de restablecimiento
    const resetSearch = () => {
        // Copia todo el estado anterior y actualiza solo la propiedad searchQuery a una cadena vacía
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: "",
        }))
    }

    const { results, isLoading } = useSearchRestaurants(searchState, city); // Hook para buscar restaurantes por ciudad

    if (isLoading) {
        return <span>Loading...</span> // Muestra un mensaje de carga mientras se obtienen los resultados
    }

    if (!results?.data || !city) {
        <span>No results found</span>
    }

    return (

        // primero se hace para mobile en una columna y luego para desktop 2, una de 250px y otra de 1fr (que ocupa el resto del espacio disponible)
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cousines-list">
                <CuisineFilter
                    selectedCuisines={searchState.selectedCuisines}
                    onChange={setSelectedCuisines}
                    isExpanded={isExpanded}
                    onExpandedClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)} // Cambia el estado de expansión al hacer clic
                />
            </div>

            <div id="main-content" className="flex flex-col gap-5">

                <SearchBar
                    searchQuery={searchState.searchQuery} // a la busqueda le asigno el valor actual del estado, si se actualiza el estado se re renderiza el componente
                    onSubmit={setSearchQuery}
                    placeHolder="Search by Cuisine or Restaurant name"
                    onReset={resetSearch}
                />

                <div className="flex justify-between flex-col gap-3 lg:flex-row">
                    <SearchResultInfo total={results?.pagination?.total ?? 0} city={city ?? "Unknown"} />

                    <SortOptionDropdown sortOption={searchState.sortOption ?? ''} onChange={(value) => setSortOption(value)} />
                </div>


                {
                    results?.data.map((restaurant) => (
                        <SearchResultCard key={restaurant._id} restaurant={restaurant} />
                    ))
                }

                <PaginationSelector
                    page={results?.pagination.page ?? 1}
                    pages={results?.pagination.pages ?? 1}
                    onPageChange={setPage}
                />

            </div>
        </div>

    );

}

export default SearchPage;