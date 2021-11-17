import React, {useState, useEffect} from 'react';
import './App.css';
import {Reserva, Casa} from './dtos';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import { useNavigate, useParams } from 'react-router';

//npm i react-toastify
//https://wbruno.com.br/html/validando-formularios-apenas-com-html5/

export default function PaginaReserva() {
  let navigate = useNavigate();
  const imgs: string = "https://imoveisvaledosinos.com.br/wp-content/uploads/mercado-publico.jpg";
  const [dados, setDados] = useState<Reserva>();
  const [acao, setAcao] = useState('tabela');
  const [Id, setId] = useState('0');

  const [anfitriao, setAnfitriao] = useState('');
  const [estado, setEstado] = useState('');
  const [local, setLocal] = useState('');
  const [cidade, setCidade] = useState('');
  const [quartos, setQuartos] = useState(0);
  const [camas, setCamas] = useState(0);
  const [banheiros, setBanheiros] = useState(0);
  const [hospedes, setHospedes] = useState(0);
  const [moradia, setMoradia] = useState('');
  
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(false);
  const [url, setUrl] = useState(`http://localhost:3000/readReserva/`);
  const [search, setSearch] = useState('');

  
  const success = () => toast.success('Dados enviados!');
  const error = () => toast.error('Não foi possível!');
  const waiting= ()=> toast.info('Carregando...');

  

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

  return (
<>

<div className="container">
<div className="row">

{(acao=='tabela') &&
 dados && (

<div>
  <form onSubmit={event => {
    setUrl(`http://localhost:3000/readReserva/`);
    event.preventDefault();
 }}
  >
    <button
                    className='btn btn-success'
                    type="submit">
                    Novo
                  </button>
        </form>
        
        <div className="col">
        <div className="card" style={{width: '80%'}}>
          <div className="card-body">
            <div className="card-caption">
    
    <table  width={'98%'} className='table'>
              <tr>
                <th scope="col">CheckIn</th>
                <th scope="col">CheckOut</th>
                <th scope="col">Nome</th>
                <th scope="col">Telefone</th>
                <th scope="col">Ação</th>
              </tr>

              {dados.map((dados: Reserva) =>{

                return(
                 
                <tr className='evenRow'>
                  <td scope="row">{dados.checkin}</td>
                  <td scope="row">{dados.checkout}</td>
                  <td scope="row">{dados.nome}</td>
                  <td scope="row">{dados.telefone}</td>
                  <td scope="row">
                 {/**<form onSubmit={event => {
                     
                      navigate(`/detalhe/${dados._id}`);
                  }}
                  style={
                    { 
                      float: 'left' , 
                      display: 'inline-block'
                    }}> */}
                  
                                   
                  <form onSubmit={event => {
                      setAcao('tabela')
                      setUrl(`http://localhost:3000/deleteCasa/${dados._Id}/`);
                      event.preventDefault();
                  }}
                  
                  style={
                  { 
                    float: 'left' , 
                    display: 'inline-block'
                  }}
                   >
                  
                  <button
                    className='btn btn-danger'
                    type="submit">
                    Excluir
                  </button>
                  </form>
                  </td>
                </tr>
                
              )
              })}

            </table>
             </div>
             </div>
             </div>
             </div>
             </div>
      )
}




</div>
    </div>

    </>


)


}