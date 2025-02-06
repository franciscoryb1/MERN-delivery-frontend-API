import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    
    if (isLoading) {
        return null;
    }
    
    if (isAuthenticated) {
        // Outlet renderiza el componente que esta dentro de la ruta
        return <Outlet />;
    }

    return <Navigate to="/" replace />; // replace para que no se pueda volver a la pagina anterior

};

export default ProtectedRoute;