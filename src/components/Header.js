 // React
import { Fragment } from 'react';

// Redux
import { useAuth } from '../redux/useAuth';

// React Bootstrap
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap';

/* Header (navbar) to be displayed on the top of each page. Displays Login and Register links
*  if no user is logged in or Questions, Results, and Log Out links as well as the current username
*  if a user is logged in. */
export const Header = () => {
  const {loggedIn, username, } = useAuth();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
				<Navbar.Brand>
					<Nav.Link>
						<LinkContainer to="/home">
							<span className="text-danger h3"><b>CGI</b></span>
						</LinkContainer>
					</Nav.Link>
				</Navbar.Brand>

				{loggedIn && (
					<Fragment>
						<Nav>
							<Nav.Item>
								<Nav.Link>
									<LinkContainer to="/questions">
										<span>Questions</span>
									</LinkContainer>
								</Nav.Link>
							</Nav.Item>
							
							<Nav.Item>
								<Nav.Link>
									<LinkContainer to="/results">
										<span>Results</span>
									</LinkContainer>
								</Nav.Link>
							</Nav.Item>
						</Nav>

						<Nav>
							<Nav.Item>
								<Nav.Link>
									<LinkContainer to="/logout">
										<span>Log Out</span>
									</LinkContainer>
								</Nav.Link>
							</Nav.Item>

							<Nav.Item>
								<Navbar.Text title="userStatus">
									Signed in as <span className="text-danger">{username}</span>
								</Navbar.Text>
							</Nav.Item>
						</Nav>
					</Fragment>
				)}

				{!loggedIn && (
					<Nav>
						<Nav.Item>
							<Nav.Link>
								<LinkContainer to="/login">
									<span>Login</span>
								</LinkContainer>
							</Nav.Link>
						</Nav.Item>
						
						<Nav.Item>
							<Nav.Link>
								<LinkContainer to="/register">
									<span>Register</span>
								</LinkContainer>
							</Nav.Link>
						</Nav.Item>
					</Nav>
				)}
      </Container>
    </Navbar>
  )
}