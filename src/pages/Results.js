// Redux
import { useAuth } from "../redux/useAuth";

// React Router
import { Navigate } from "react-router-dom";

export const Results = () => {
    const {loggedIn, email, username} = useAuth();

    if(!loggedIn){
      alert("You must log in to access this page!");
		  return <Navigate to="/login" />;
    }

    return (
      <></> // TODO
    );
}