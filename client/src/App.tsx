import './App.css';
import { Navbar, Nav} from 'react-bootstrap';
import { NavLink, Outlet} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={NavLink} to="/">Desafio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/ofertas">Ofertas</Nav.Link>
            <Nav.Link as={NavLink} to="/cadastro">Cadastro</Nav.Link>
            <Nav.Link as={NavLink} to="/sobre">Sobre</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <header>
        
      </header>
      <main>
        <ToastContainer />
        <Outlet />
      </main>
      <footer className="footer navbar-fixed-bottom">
        <p>Desenvolvido por Fabio J. C. Batista e Matheus G. M. da Silva</p>
      </footer>
    </>
  );
}
