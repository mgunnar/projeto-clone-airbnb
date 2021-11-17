import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import PaginaNaoEcontrada from './PaginaNaoEcontrada';
import PaginaPrincipal from './PaginaPrincipal';
import PaginaOfertas from './PaginaOfertas';
import PaginaReserva from './PaginaReserva';

import PaginaCadastro from './PaginaCadastro';

import PaginaDetalheOferta from './PaginaDetalheOferta';
import PaginaSobre from './PaginaSobre';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginaCadastroEdicao from './PaginaCadastroEdicao';
import PaginaREdicao from './PaginaReserva';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<PaginaPrincipal />}/>
          <Route path="ofertas" element={<PaginaOfertas />}>
                     </Route>
          <Route path="reserva" element={<PaginaReserva />} />
          <Route path="cadastro" element={<PaginaCadastro />} />
          <Route path="detalhe/:id" element={<PaginaDetalheOferta />} />
          <Route path="cadastroEdicao/:id" element={<PaginaCadastroEdicao/>} />
          <Route path="reservaEdicao/:id" element={<PaginaREdicao/>} />
          <Route path="sobre" element={<PaginaSobre />} />
          
          
          <Route path="*" element={<PaginaNaoEcontrada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();