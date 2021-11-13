import React, {useState, useEffect} from 'react';
import Axios from "axios";
import './App.css';
import {Casa, Reserva} from './dtos';
import { Route,useParams, useNavigate } from 'react-router-dom'


export default function PaginaDetalhe() {
    let parametros = useParams();
    let Idparametro: string = parametros.id!;
    let navigate = useNavigate();
    const imgs: string = "https://imoveisvaledosinos.com.br/wp-content/uploads/mercado-publico.jpg";
    const [Id, setId] = useState(Idparametro);
   

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
  const [url, setUrl] = useState(`http://localhost:3000/readCasa/${Id}`);
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
          const resultado = await fetch(url);
          if (resultado.ok) {
            const dados: Casa = await resultado.json();
            setDados(dados);
            console.log(dados);
          } else {
            setErro(true);
            console.log(dados);
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
      
      {erro && <div>Ocorreu um erro!</div>}
      {carregando ? (
        <div>Carregando...</div>
      ) : (
        dados && (
          
          <div>

      <div className="row">
      <div className="col">
          <div className="card" style={{width: '80%'}}>
            <div className="card-body">
              <h5 className="card-title">{dados.local}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{dados.cidade} / {dados.estado}</h6>
              <h6 className="card-subtitle mb-2 text-muted"><b>Anfitrião:</b> {dados.anfitriao}</h6>
              <p className="card-text">
               <a href="#" className="card-link"><img src={imgs} width="98%" height="320px"/></a>
              </p>
              <hr/>

              <div className="leftPosition">
              <p className="card-text">
                Tipo de Moradia: [casa, apartamento]
              </p>
              <p className="card-text">
               Quarto: {dados.quartos}
              </p>
              <p className="card-text">
               Camas:{dados.camas}
              </p>
              <p className="card-text">
               Banheiros: {dados.banheiros}
              </p>
              <p className="card-text">
                Hóspedes: {dados.hospedes}
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
    )}
  </div>
);
}