import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ component: RouteComponent, roles }) => {
  const isAuthenticated = true;

  if (isAuthenticated) {
    return <Route element={<RouteComponent />} />;
  }

  if (!isAuthenticated) {
    return <h1>access denied</h1>;
  }

  return <Navigate to="/" />;
};

export default PrivateRoute;
