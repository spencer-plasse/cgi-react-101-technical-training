// React
import { useState } from 'react';

// React Router
import { Navigate } from 'react-router-dom';

// Redux
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useAuth } from "../redux/useAuth";

// React Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { LinkContainer } from 'react-router-bootstrap';

// "/logout" page
export const Logout = () => {
  const [loggedOut, setLoggedOut] = useState(false);
	const {loggedIn, username, } = useAuth();
	const dispatch = useDispatch();

	function handleLogout(){
		dispatch(logout());
    setLoggedOut(true);
	}

	// Redirect to the home page when the user logs out
	if(loggedOut){
		return <Navigate to="/home" />
	}

	// If the user was not logged in to begin with, redirect them to the login page
	if(!loggedIn){
		alert("You must log in to access this page!");
		return <Navigate to="/login" />;
	}

	else{
		return (
			<Form onSubmit={handleLogout}>
				<Form.Text className="h5 mb-3">Are you sure you want to log out <span className="text-danger">{username}</span>?</Form.Text>

				<Form.Group>
					<Button type="button" variant="secondary" className="mr-4">
						<LinkContainer to="/home">
							<span>Cancel</span>
						</LinkContainer>
					</Button>

					<Button type="submit" variant="danger">Log Out</Button>
				</Form.Group>
			</Form>
		)
	}
}