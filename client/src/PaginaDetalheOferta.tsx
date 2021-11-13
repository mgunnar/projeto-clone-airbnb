import React, {useState, useEffect} from 'react';
import Axios from "axios";
import './App.css';
import {Casa, Reserva} from './dtos';
import { Route,useParams, useNavigate } from 'react-router-dom'


export default function PaginaDetalhe() {
    let parametros = useParams();
    let Id = parametros.id!;
    let navigate = useNavigate();
    const imgs: string = "https://imoveisvaledosinos.com.br/wp-content/uploads/mercado-publico.jpg";

   

  //const radios: string = "Local, Cidade, Quartos, Camas, Banheiros, Hospedes";
  const [dados, setDados] = useState<Casa>();

  const [local, setLocal] = useState('');
  const [cidade, setCidade] = useState('');
  const [quartos, setQuartos] = useState(0);
  const [camas, setCamas] = useState(0);
  const [banheiros, setBanheiros] = useState(0);
  const [hospedes, setHospedes] = useState(0);

  const [idcasa,setIdcasa] = useState<Casa>(); 
  const [checkin,setCheckin] = useState(new Date());
  const [checkout,setCheckout] = useState(new Date());
  const [nome,setNome] = useState('');
  const [telefone,setTelefone] = useState(0);
   
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(false);
  const [url, setUrl] = useState('');
  const [search, setSearch] = useState('');
  const estado="";
  const anfitriao="";
  
  
  
    useEffect(() => { 
     /*
      Axios.get(`http://localhost:3000/readLocal/`).then((response) =>{ 
        setListaResultado(response.data);
      });
      */
      async function consulta() {
        setErro(false);
        setCarregando(true);
        try {

        //Realizar um POST
        
        const post: Casa = {
        anfitriao: anfitriao,
        estado: estado,
        local: local,
        cidade: cidade,
        quartos: quartos,
        camas: camas,
        banheiros: banheiros,
        hospedes: hospedes

        };
        const resposta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        if (resposta.ok) {
            const dadosjson: Casa = await resposta.json();
            console.log('Dados:');
            console.log(dadosjson);
        } else {
            console.log('POST status:', resposta.status);
            console.log('POST statusText:', resposta.statusText);
            setErro(true);
        }
        /*
          const postReserva: Reserva = {
            idcasa:      Casa,
            checkin:     checkin,
            checkout:    checkout,
            nome:      nome,
            telefone:   telefone
  
          };
          const respostaReserva = await fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(postReserva)
          });
          if (respostaReserva.ok) {
              const dadosjson: Casa = await respostaReserva.json();
              console.log('Dados:');
              console.log(dadosjson);
          } else {
              console.log('POST status:', respostaReserva.status);
              console.log('POST statusText:', respostaReserva.statusText);
              setErro(true);
          }
*/
        } catch (error) {
          setErro(true);
        }
        setCarregando(false);
      }
      consulta();

    },[url]);

   

        return (
      <div className="container">
      <div className="row">
      <div className="col">
          <div className="card" style={{width: '80%'}}>
            <div className="card-body">
              <h5 className="card-title">Local da oferta</h5>
              <h6 className="card-subtitle mb-2 text-muted">Cidade da Oferta</h6>
              <p className="card-text">
               <a href="#" className="card-link"><img src={imgs} width="98%" height="320px"/></a>
              </p>
              <hr/>

              <div className="leftPosition">
              <p className="card-text">
                Tipo de Moradia: [casa, apartamento]
              </p>
              <p className="card-text">
               Quarto: 
              </p>
              <p className="card-text">
               Camas:
              </p>
              <p className="card-text">
               Banheiros
              </p>
              <p className="card-text">
                Hóspedes:
              </p>
              <p className="card-text">
               
              </p>
              <p className="card-text">
               
              </p>
              <p className="card-text">
               
              </p>
              </div>

              <div className="rightPosition">
              
            <div className="rightPosition">
              <p className="card-text">
                Check-In: 
                <input 
                  type="date" 
                  name="check-in"
                  className= "register--input"
                  onChange={(event)=>{
                  //setSearch(event.target.value);
                 }}
              />
            </p>
            <p className="card-text">
            Check-Out:  
            <input 
              type="date" 
              name="check-out"
                 
              className= "register--input"
              onChange={(event)=>{
              //setSearch(event.target.value);
            }}
            />
            </p>
            <p className="card-text">
            Nome:
            <input 
              type="text" 
              name="Nome"
              placeholder="Nome"
              className= "register--input"
              onChange={(event)=>{
              //setSearch(event.target.value);
             }}
             />
            </p>
            <p className="card-text">
            Telefone:
            <input 
              type="text" 
              name="telefone"
              placeholder="Telefone"
              className= "register--input"
              onChange={(event)=>{
              //setSearch(event.target.value);
             }}
            />
            </p>
              <p className="card-text">
                Valor da Outra Página: {Id}
              </p>
              <p className="card-text">
               
              </p>
              <p className="card-text">
               
              </p>
              <button
              type="submit">Reservar</button>
              
              </div>

              <div>






             




    </div>
              

            </div>
          </div>
          </div>
          </div>
          </div>
    </div>
    
       )
     
      
    }