import React, {useState, useEffect} from 'react';
import Axios from "axios";
import './App.css';
import {Casa, Reserva} from './dtos';
import { useParams, useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import dayjs from 'dayjs';
//npm i bootstrap
//npm install react-bootstrap-table2-overlay
//npm i react-bootstrap-table2-paginator --force
//npm i react-bootstrap-table-next --force
//npm i dayjs 
//https://medium.com/code-prestige/manipulando-o-tempo-usando-o-day-js-2926af277dbe

export default function PaginaReserva() {
let parametros = useParams();
let Idparams = parametros.id!;
let navigate = useNavigate();
const [dados, setDados] = useState<Reserva>();
const [Id, setId] = useState(Idparams);
const [refresh, setRefresh] = useState(null);

const [anfitriao, setAnfitriao] = useState('');
const [estado, setEstado] = useState('');
const [local, setLocal] = useState('');
const [cidade, setCidade] = useState('');
const [quartos, setQuartos] = useState(0);
const [camas, setCamas] = useState(0);
const [banheiros, setBanheiros] = useState(0);
const [hospedes, setHospedes] = useState(0);

const [carregando, setCarregando] = useState(false);
const [erro, setErro] = useState(false);
const [url, setUrl] = useState(`http://localhost:3000/readReserva/`);
const [urlDelete, setUrlDelete] = useState(url);

  useEffect(() => { 
   async function consulta() {
      setErro(false);
      setCarregando(true);
      try {
        const resultado = await fetch(url);
        if (resultado.ok) {
          const dados: Reserva = await resultado.json();
          setDados(dados);
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

  useEffect(() => { 
    async function remover() {
       setErro(false);
       try {
         
         const resultado = await fetch(urlDelete);
          if (resultado.ok) {
           const dados: Reserva = await resultado.json();
           setDados(dados);
           console.log(dados);
           
          } else {
           setErro(true);
         }
       } catch (error) {
         setErro(true);
       }
       setCarregando(false);
     }
     if (urlDelete!=''){
      remover();
     }else{
      
     }
   },[urlDelete]);
   useEffect(() => { 
    const refreshPage = ()=>{setRefresh(null)}
     refreshPage();
    }, [refresh]);

return (
  <div onLoad={event=>{
    setUrl('http://localhost:3000/readReserva/');
  }}>
      <form onSubmit={event => {
        setUrlDelete(`http://localhost:3000/deleteReserva/${Id}/`);
        event.preventDefault();
      }}>

    {erro && <div>Não encontramos itens!</div>}
      {carregando ? (
        <div>Carregando...</div>
      ) : (
      dados && (
          <div className='table-responsive-sm'>
          
            <table  width={'98%'} className='table table-striped table-sm'>
              <tr>
                <th>Local</th>
                <th>Cidade</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Ação</th>
              </tr>

              {dados.map((dados: Reserva, dadosCasa: Casa) =>{
              
              return(
                
                <tr className='evenRow'>
                  <td>{dadosCasa.local}</td>
                  <td>{dadosCasa.cidade}</td>
                  <td>{dayjs(dados.checkin).format('DD/MM/YYYY')}</td>
                  <td>{dayjs(dados.checkout).format('DD/MM/YYYY')}</td>
                  <td>{dados.nome}</td>
                  <td>{dados.telefone}</td>
                  <td>
                  <button
                    onClick={(event=>{setRefresh(null);})}
                    type="submit">
                    Excluir
                  </button>
                 </td>
                </tr>
              )
              })}
            </table>
          </div>
        )
      )
    }
    </form>
   </div>
  );
}