import React, {useState, useEffect} from 'react';
import Axios from "axios";
import './App.css';
import {Casa} from './dtos';


export default function PaginaOfertas() {
  //const imgs: string = "https://imoveisvaledosinos.com.br/wp-content/uploads/mercado-publico.jpg";
  //const radios: string = "Local, Cidade, Quartos, Camas, Banheiros, Hospedes";
  const [dados, setDados] = useState<Casa>();

  const [local, setLocal] = useState('');
  const [cidade, setCidade] = useState('');
  const [quartos, setQuartos] = useState(0);
  const [camas, setCamas] = useState(0);
  const [banheiros, setBanheiros] = useState(0);
  const [hospedes, setHospedes] = useState(0);

  const [radio, setRadio] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(false);
  const [url, setUrl] = useState('http://localhost:3000/readCasa/');
  const [search, setSearch] = useState('');

  
  
  
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
          }
        } catch (error) {
          setErro(true);
        }
        setCarregando(false);
      }
      consulta();

    },[url]);

  
    const insert = () => {
      Axios.get(`http://localhost:3000/insert/`, { params: {
        local: local,
        cidade: cidade,
        quartos: quartos,
        camas: camas,
        banheiros: banheiros,
        hospedes: hospedes
  
      }});
    };

  
    return (

<>
  
<form onSubmit={event => {

        switch(radio){
          case 'Tudo':
            setUrl(` http://localhost:3000/readCasa/`);
          break;
          case 'Local':
            setUrl(`http://localhost:3000/readLocal/${search}`);
          break;
          case 'Cidade':
            setUrl(`http://localhost:3000/readCidade/${search}`);
          break;
          case 'Quartos':
            setUrl(`http://localhost:3000/readQuartos/${search}`);
          break;
          case 'Camas':
            setUrl(`http://localhost:3000/readCamas/${search}`);
          break;
          case 'Banheiros':
            setUrl(`http://localhost:3000/readBanheiros/${search}`);
          break;
          case 'Hospedes':
            setUrl(`http://localhost:3000/readHospedes/${search}`);
          break;
          default:
            setUrl(`http://localhost:3000/readCasa/${search}`);

        }
        event.preventDefault();
      }}>

<div className="app--container">
      <div className='register--container'>
        <h6 className ='register--title'>Buscar por: </h6>
        
 <div className="form-check form-check-inline">
  <input
    className="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="inlineRadio1"
    value="Tudo"
    //checked={selectedOption === "Local"}
    onChange={event => setRadio(event.target.value)}
  />
  <label className="form-check-label" >Tudo</label>
</div>
 
 <div className="form-check form-check-inline">
  <input
    className="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="inlineRadio1"
    value="Local"
    //checked={selectedOption === "Local"}
    onChange={event => setRadio(event.target.value)}
  />
  <label className="form-check-label" >Local</label>
</div>
 
<div className="form-check form-check-inline">
  <input
    className="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="inlineRadio2"
    value="Cidade"
    onChange={event => setRadio(event.target.value)}
  />
  <label className="form-check-label" >Cidade</label>
</div>

<div className="form-check form-check-inline">
  <input
    className="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="inlineRadio3"
    value="Quartos"
    onChange={event => setRadio(event.target.value)}
    
  />
  <label className="form-check-label" >Quartos</label>
</div>


<div className="form-check form-check-inline">
  <input
    className="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="inlineRadio1"
    value="Camas"
    onChange={event => setRadio(event.target.value)}
  />
  <label className="form-check-label" >Camas</label>
</div>
 
<div className="form-check form-check-inline">
  <input
    className="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="inlineRadio2"
    value="Banheiros"
    onChange={event => setRadio(event.target.value)}
  />
  <label className="form-check-label" >Banheiros</label>
</div>

<div className="form-check form-check-inline">
  <input
    className="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="inlineRadio3"
    value="Hospedes"
    onChange={event => setRadio(event.target.value)}
    
  />
  <label className="form-check-label" >Hospedes</label>
</div>


        <input 
          type="text" 
          name="valor"
          placeholder="Pesquise aqui"
          className= "register--input"
          onChange={(event)=>{
            setSearch(event.target.value);
          }}
        />

      <button 
        className='register--button'
        type="submit">
          Buscar    
      </button>
   
        
      </div>
      
    </div>

    </form>
    


      {erro && <div>Ocorreu um erro!</div>}
      {carregando ? (
        <div>Carregando...</div>
      ) : (
        dados && (
          
    <div className="container">
       <div className="row">
        
      {dados.map((dados: Casa) =>{
      return (
      
      <div className="col">
          <div className="card" style={{width: 300}}>
            <div className="card-body">
              <h5 className="card-title">{dados.local}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{dados.cidade}</h6>
              <p className="card-text">
               <a href="#" className="card-link"><img src={dados.local} width="270px" height="220px"/></a>
              </p>
            </div>
          </div>
          </div>
            )
          })}
          </div>
          </div>
        )
      )}
    </>
  );
}