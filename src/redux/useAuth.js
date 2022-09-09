// Redux
import { useSelector } from "react-redux";

// Hook to simplify authentication checks across the application
export function useAuth(){
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const user = useSelector((state) => state.auth.user);

  // Return whether a user is logged in, and if so, their email and username as well
  return {
    loggedIn: loggedIn,
    email: (loggedIn) ? user.email : null,
    username: (loggedIn) ? user.username : null
  };
}