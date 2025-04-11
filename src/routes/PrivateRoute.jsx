import { Navigate } from "react-router-dom";
import { useAuth } from "@/providers/authContext";

const PrivateRoute = ({ children }) => {
    const { loading, isAuthenticated } = useAuth();
    if (loading) {
        return <p>checking</p>;
    }
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
