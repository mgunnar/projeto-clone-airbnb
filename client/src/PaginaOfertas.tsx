import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from "axios";

export default function PaginaOfertas() {
    const imgs: string = "https://imoveisvaledosinos.com.br/wp-content/uploads/mercado-publico.jpg";
    
  const [local, setLocal] = useState('');
  const [cidade, setCidade] = useState('');
  const [quartos, setQuartos] = useState(0);
  const [camas, setCamas] = useState(0);
  const [banheiros, setBanheiros] = useState(0);
  const [hospedes, setHospedes] = useState(0);
  const [search, setSearch] = useState('');

  const [listaResultado, setListaResultado] = useState([]);
  
  
    useEffect(() => { 
      Axios.get(`http://localhost:3000/readLocal/`).then((response) =>{ 
        setListaResultado(response.data);
      });

      Axios.get(`http://localhost:3000/readCidade/`).then((response) =>{ 
        setListaResultado(response.data);
      });

      Axios.get(`http://localhost:3000/readQuartos/`).then((response) =>{ 
        setListaResultado(response.data);
      });

      Axios.get(`http://localhost:3000/readCamas/`).then((response) =>{ 
        setListaResultado(response.data);
      });

      Axios.get(`http://localhost:3000/readBanheiros/`).then((response) =>{ 
        setListaResultado(response.data);
      });

      Axios.get(`http://localhost:3000/readHospedes/`).then((response) =>{ 
        setListaResultado(response.data);
      });
    },[]);

  
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
          <div>

<div className="app--container">
      <div className='register--container'>
        <h6 className ='register--title'>Buscar por: </h6>
        
 <div className="form-check form-check-inline">
  <input
    className="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="inlineRadio1"
    value="local"
  />
  <label className="form-check-label" >Local</label>
</div>
 
<div className="form-check form-check-inline">
  <input
    className="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="inlineRadio2"
    value="cidade"
  />
  <label className="form-check-label" >Cidade</label>
</div>

<div className="form-check form-check-inline">
  <input
    className="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="inlineRadio3"
    value="quarto"
    
  />
  <label className="form-check-label" >Quarto</label>
</div>


<div className="form-check form-check-inline">
  <input
    className="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="inlineRadio1"
    value="camas"
  />
  <label className="form-check-label" >Camas</label>
</div>
 
<div className="form-check form-check-inline">
  <input
    className="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="inlineRadio2"
    value="banheiros"
  />
  <label className="form-check-label" >Banheiros</label>
</div>

<div className="form-check form-check-inline">
  <input
    className="form-check-input"
    type="radio"
    name="inlineRadioOptions"
    id="inlineRadio3"
    value="hospedes"
    
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
        onClick={insert}
        >Buscar</button>
      </div>
      
    </div>


    
    <div className="container">
       <div className="row">

        <div className="col">
        <div className="card" style={{width: 300}}>
        <div className="card-body">
        <h5 className="card-title">Mercado Público</h5>
        <h6 className="card-subtitle mb-2 text-muted">Porto Alegre/RS</h6>
        <p className="card-text">
        <a href="#" className="card-link"><img src={imgs} width="270px" height="220px"/></a>
          </p>
      </div>
    </div>
    </div>
    
    
    <div className="col">
        <div className="card" style={{width: 300}}>
        <div className="card-body">
        <h5 className="card-title">Mercado Público</h5>
        <h6 className="card-subtitle mb-2 text-muted">Porto Alegre/RS</h6>
        <p className="card-text">
        <a href="#" className="card-link"><img src={imgs} width="270px" height="220px"/></a>
          </p>
      </div>
    </div>
    </div>
    
    
    <div className="col">
        <div className="card" style={{width: 300}}>
        <div className="card-body">
        <h5 className="card-title">Mercado Público</h5>
        <h6 className="card-subtitle mb-2 text-muted">Porto Alegre/RS</h6>
        <p className="card-text">
        <a href="#" className="card-link"><img src={imgs} width="270px" height="220px"/></a>
          </p>
      </div>
    </div>
    </div>
    
    
    <div className="col">
        <div className="card" style={{width: 300}}>
        <div className="card-body">
        <h5 className="card-title">Mercado Público</h5>
        <h6 className="card-subtitle mb-2 text-muted">Porto Alegre/RS</h6>
        <p className="card-text">
        <a href="#" className="card-link"><img src={imgs} width="270px" height="220px"/></a>
          </p>
      </div>
    </div>
    </div>
    
    
    <div className="col">
        <div className="card" style={{width: 300}}>
        <div className="card-body">
        <h5 className="card-title">Mercado Público</h5>
        <h6 className="card-subtitle mb-2 text-muted">Porto Alegre/RS</h6>
        <p className="card-text">
        <a href="#" className="card-link"><img src={imgs} width="270px" height="220px"/></a>
          </p>
      </div>
    </div>
    </div>
    
    
    <div className="col">
        <div className="card" style={{width: 300}}>
        <div className="card-body">
        <h5 className="card-title">Mercado Público</h5>
        <h6 className="card-subtitle mb-2 text-muted">Porto Alegre/RS</h6>
        <p className="card-text">
        <a href="#" className="card-link"><img src={imgs} width="270px" height="220px"/></a>
          </p>
      </div>
    </div>
    </div>
    
    
    <div className="col">
        <div className="card" style={{width: 300}}>
        <div className="card-body">
        <h5 className="card-title">Mercado Público</h5>
        <h6 className="card-subtitle mb-2 text-muted">Porto Alegre/RS</h6>
        <p className="card-text">
        <a href="#" className="card-link"><img src={imgs} width="270px" height="220px"/></a>
          </p>
      </div>
    </div>
    </div>
    
    
    <div className="col">
        <div className="card" style={{width: 300}}>
        <div className="card-body">
        <h5 className="card-title">Mercado Público</h5>
        <h6 className="card-subtitle mb-2 text-muted">Porto Alegre/RS</h6>
        <p className="card-text">
        <a href="#" className="card-link"><img src={imgs} width="270px" height="220px"/></a>
          </p>
      </div>
    </div>
    </div>
    
    
    
    
    </div>
    </div>
    
    <h1>Resultado</h1>
    {listaResultado.map((val, key) =>{
      return 
      <div key={key}>
      <h1> val.local  </h1>
      <h1> val.cidade  </h1>
      <h1> val.quartos  </h1>
      <h1> val.camas </h1>
      <h1> val.banheiros  </h1>
      <h1> val.hospedes  </h1>
      </div>
    })}
    </div>
    
       )
     
      
    }