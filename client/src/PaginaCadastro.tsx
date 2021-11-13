import React, {useState, useEffect} from 'react';
import './App.css';
import {Casa} from './dtos';


export default function PaginaCadastro() {
  const imgs: string = "https://imoveisvaledosinos.com.br/wp-content/uploads/mercado-publico.jpg";
  const [dados, setDados] = useState<Casa>();

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
  const [url, setUrl] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => { 
      async function consulta() {
        setErro(false);
        setCarregando(true);
        try {
        const post: Casa = {
        anfitriao: anfitriao,
        local: local,
        cidade: cidade,
        estado: estado,
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
        

        } catch (error) {
          setErro(true);
        }
        setCarregando(false);
      }
      consulta();

    },[url]);

  return (
<>
<form onSubmit={event => {
 setUrl(`http://localhost:3000/insertCasa/`);
 event.preventDefault();
}}>

<div className="container">
<div className="row">
<div className="col">
    <div className="card" style={{width: '80%'}}>
      <div className="card-body">
        <div className="card-caption">


        <h5 className="card-title">
          Local da oferta: 
          <input 
          type="text" 
          name="local"
          placeholder="Local"
          className= "register--input"
          onChange={(event)=>{
            setLocal(event.target.value);
          }}
        />     
        </h5>

        <h6 className="card-subtitle mb-2 text-muted">
          Cidade:
          <input 
          type="text" 
          name="cidade"
          placeholder="Cidade"
          className= "register--input"
          onChange={(event)=>{
            setCidade(event.target.value);
          }}
        />
          
          </h6>

          <h6 className="card-subtitle mb-2 text-muted">
          Estado:
          <input 
          type="text" 
          name="estado"
          placeholder="Estado"
          className= "register--input"
          onChange={(event)=>{
            setEstado(event.target.value);
          }}
        />
          
          </h6>

        <h6 className="card-subtitle mb-2 text-muted">
          Anfitrião:
          <input 
          type="text" 
          name="anfitriao"
          placeholder="Anfitrião"
          className= "register--input"
          onChange={(event)=>{
            setAnfitriao(event.target.value);
          }}
        />
          
          </h6>


        </div>
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

         <input 
          type="text" 
          name="quartos"
          placeholder="Quartos"
          className= "register--input"
          onChange={(event)=>{
            setQuartos(parseInt(event.target.value));
          }}
        />
        </p>
        <p className="card-text">
         Camas:
         <input 
          type="text" 
          name="camas"
          placeholder="Camas"
          className= "register--input"
          onChange={(event)=>{
            setCamas(parseInt(event.target.value));
          }}
        />
        </p>
        <p className="card-text">
         Banheiros
         <input 
          type="text" 
          name="banheiros"
          placeholder="Banheiros"
          className= "register--input"
          onChange={(event)=>{
            setBanheiros(parseInt(event.target.value));
          }}
        />
        </p>
        <p className="card-text">
          Hóspedes:

          <input 
          type="text" 
          name="hospedes"
          placeholder="Hóspedes"
          className= "register--input"
          onChange={(event)=>{
            setBanheiros(parseInt(event.target.value));
          }}
        />
        </p>
        <p className="card-text">
         
        </p>
        <p className="card-text">
         
        </p>
        <p className="card-text">
         
        </p>
        </div>

        <p className="card-text">
          
        </p>
        <p className="card-text">
         
        </p>
        <p className="card-text">
         
        </p>
        <button
        className='register--button'
        type="submit">
          Salvar</button>
        <button
        className='register--button'
        type="reset">
          Limpar</button>
        </div>

      </div>
    </div>
    </div>
    </div>
    

    </form>
    </>


 )


}