import { useSelector } from "react-redux";

export function useAuth(){
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const user = useSelector((state) => state.auth.user);

  return {
    loggedIn: loggedIn,
    email: (loggedIn) ? user.email : null,
    username: (loggedIn) ? user.username : null
  };
}