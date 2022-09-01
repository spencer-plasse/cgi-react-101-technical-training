 // React
import { Fragment } from 'react';

// Redux
import { useSelector } from 'react-redux';

// React Bootstrap
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap';

export const Header = () => {
  const authStatus = useSelector((state) => state.auth);

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

				{authStatus.loggedIn && (
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
								<Navbar.Text>
									Signed in as <span className="text-danger">{authStatus.user.username}</span>
								</Navbar.Text>
							</Nav.Item>
						</Nav>
					</Fragment>
				)}

				{!authStatus.loggedIn && (
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