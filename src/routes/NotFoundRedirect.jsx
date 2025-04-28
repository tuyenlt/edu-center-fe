import { useAuth } from "@/providers/authContext";
import { Navigate } from "react-router-dom";

const NotFoundRedirect = () => {
    const { loading, isAuthenticated } = useAuth();
    if (loading) {
        return <p>Checking authentication...</p>;
    }
    return <Navigate to={isAuthenticated ? "/home" : "/login"} replace />;
};

export default NotFoundRedirect;