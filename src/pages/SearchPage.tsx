import { useSearchRestaurants } from "@/api/RestaurantApi";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";


export type SearchState = {
    searchQuery: string;
}


const SearchPage = () => {
    const { city } = useParams(); // city porque asi lo llame en AppRoutes.tsx al definir la ruta

    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "", // Estado inicial de la búsqueda
    })

    const setSearchQuery = (searchFormData: SearchForm) => {
        // Copia todo el estado anterior y actualiza solo la propiedad searchQuery
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery, // Actualiza el estado con la nueva consulta de búsqueda
        }))
    }

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
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gapt-5">
            <div id="cousines-list">
                insert cuisines here:
            </div>

            <div id="main-content" className="flex flex-col gap-5">

                <SearchBar
                    searchQuery={searchState.searchQuery} // a la busqueda le asigno el valor actual del estado, si se actualiza el estado se re renderiza el componente
                    onSubmit={setSearchQuery}
                    placeHolder="Search by Cuisine or Restaurant name"
                    onReset={resetSearch}
                />

                <SearchResultInfo total={results?.pagination?.total ?? 0} city={city ?? "Unknown"}
                />
                {
                    results?.data.map((restaurant) => (
                        <SearchResultCard key={restaurant._id} restaurant={restaurant} />
                    ))
                }
            </div>
        </div>

    );

}

export default SearchPage;