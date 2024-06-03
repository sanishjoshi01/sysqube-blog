import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const GuestRoute = ({ children }) => {
    const { user } = useAuth();

    return !user ? children : <Navigate to="/dashboard" />
};

export default GuestRoute;