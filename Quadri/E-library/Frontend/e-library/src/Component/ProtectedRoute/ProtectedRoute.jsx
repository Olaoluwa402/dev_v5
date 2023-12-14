import { Navigate} from "react-router";
import { useSelector } from "react-redux";

 const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.loginUser);
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute
