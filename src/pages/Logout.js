// React
import { useState } from 'react';

// React Router
import { Navigate } from 'react-router-dom';

// Redux
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

// React Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { LinkContainer } from 'react-router-bootstrap';

export const Logout = () => {
    const [loggedOut, setLoggedOut] = useState(false);
	const dispatch = useDispatch();

	function handleLogout(){
		dispatch(logout());
        setLoggedOut(true);
	}

	if(loggedOut){
		return <Navigate to="/home" />
	}

	else{
		return (
			<Form onSubmit={handleLogout}>
				<Form.Text className="h5 mb-3">Are you sure you want to log out?</Form.Text>
	
                <Form.Group>
                    <Button type="button" variant="danger" className="mr-4">
                        <LinkContainer to="/home">
                            <span>Cancel</span>
                        </LinkContainer>
                    </Button>

                    <Button type="submit" variant="primary">Log Out</Button>
                </Form.Group>
                
			</Form>
		)
	}
}