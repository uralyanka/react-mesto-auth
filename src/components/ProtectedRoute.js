import { Route, Navigate } from "react-router-dom";

export default function ProtectedRoute({ loggedIn, ...props }) {
  return loggedIn ? <Route {...props} /> : <Navigate to="/sign-in" />;
}
