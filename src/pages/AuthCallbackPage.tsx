import { useCreateMyuser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth0();
    const { createUser } = useCreateMyuser();

    // Almacena un estado pero cuando ese estado cambie no se re renderiza el componente
    const hasCreatedUser = useRef(false);

    useEffect(() => {
        if (user?.sub && user?.email && !hasCreatedUser.current) {
            // Request al backend para crear el usuario en la base de datos
            createUser({
                auth0Id: user.sub,
                email: user.email
            });
            hasCreatedUser.current = true;
        }
        navigate('/');
    }, [createUser, navigate, user]);
    return <>Loading...</>
}

export default AuthCallbackPage;