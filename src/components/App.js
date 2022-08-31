import { React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Custom components
import { Header } from './Header'
import { Footer } from './Footer'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Logout } from '../pages/Logout'
import { Questions } from '../pages/Questions'
import { Register } from '../pages/Register'
import { Results } from '../pages/Results'

// Custom stylesheets/React Bootstrap
import '../styles/App.css';
import Container from 'react-bootstrap/Container'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Container id="page-content">
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/questions" element={<Questions />}></Route>
            <Route path="/results" element={<Results />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;