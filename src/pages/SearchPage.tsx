import { useSearchRestaurants } from "@/api/RestaurantApi";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useParams } from "react-router-dom";

const SearchPage = () => {
    const { city } = useParams(); // city porque asi lo llame en AppRoutes.tsx al definir la ruta
    const { results, isLoading } = useSearchRestaurants(city); // Hook para buscar restaurantes por ciudad

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