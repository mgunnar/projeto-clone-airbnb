import React, {useState, useEffect} from 'react';
import Axios from "axios";
import './App.css';
import {Casa} from './dtos';
import { Link,useParams, useNavigate } from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
//npm i bootstrap
//npm install react-bootstrap-table2-overlay
//npm i react-bootstrap-table2-paginator --force
//npm i react-bootstrap-table-next --force

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export default function PaginaReserva() {
  let parametros = useParams();
  let Idparams = parametros.id!;
  let navigate = useNavigate();
const [dados, setDados] = useState<Casa>();
let [total, setTotal] = useState(0);
const [Id, setId] = useState('');


const [anfitriao, setAnfitriao] = useState('');
const [estado, setEstado] = useState('');
const [local, setLocal] = useState('');
const [cidade, setCidade] = useState('');
const [quartos, setQuartos] = useState(0);
const [camas, setCamas] = useState(0);
const [banheiros, setBanheiros] = useState(0);
const [hospedes, setHospedes] = useState(0);

const [radio, setRadio] = useState('');
const [carregando, setCarregando] = useState(false);
const [erro, setErro] = useState(false);
const [url, setUrl] = useState(`http://localhost:3000/readCasa/`);

const [search, setSearch] = useState('');

  useEffect(() => { 
   async function consulta() {
      setErro(false);
      setCarregando(true);
      try {
        const resultado = await fetch(url);
        //const totalCasa = await fetch(urli);
        
        if (resultado.ok) {
          const dados: Casa = await resultado.json();
          //const total = await totalCasa.json();

          setDados(dados);
          //setTotal(total);
          console.log(dados);
        } else {
          setErro(true);
        }
        
        
      } catch (error) {
        setErro(true);
      }
      setCarregando(false);
      
    }
    consulta();



  },[url]);



return (
  <div >
      
    

    {erro && <div>Não encontramos itens!</div>}
      {carregando ? (
        <div>Carregando...</div>
      ) : (
      dados && (
          <div>
          
            <table  width={'98%'} className='tblListForm'>
              <tr>
                <th>Anfitrião</th>
                <th>Local</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Quartos </th>
                <th>Camas</th>
                <th>Banheiros</th>
                <th>Hospedes</th>
                <th>Ação</th>
              </tr>

              {dados.map((dados: Casa) =>{
                return(
                
                <tr>
                  <td>{dados.anfitriao}</td>
                  <td>{dados.local}</td>
                  <td>{dados.cidade}</td>
                  <td>{dados.estado}</td>
                  <td>{dados.quartos}</td>
                  <td>{dados.camas}</td>
                  <td>{dados.banheiros}</td>
                  <td>{dados.hospedes}</td>
                  <td>

                  
                   <button onClick={() => setUrl(`http://localhost:3000/deleteCasa/${Id}}`)}>Excluir</button>
                    
                    
                  
                  </td>
                </tr>
                
              )
              })}

            </table>

 

          </div>
        )
      )
    }
   </div>
  );
}