import { useParams } from "react-router-dom";

const SearchPage = () => {
    const { city } = useParams(); // city porque asi lo llame en AppRoutes.tsx al definir la ruta

    return (
        <span>User searched for: {city}</span>
    )

}

export default SearchPage;