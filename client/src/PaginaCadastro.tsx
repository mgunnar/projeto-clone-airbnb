import React, {useState, useEffect} from 'react';
import './App.css';
import {Casa} from './dtos';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
//npm i react-toastify
//https://wbruno.com.br/html/validando-formularios-apenas-com-html5/

export default function PaginaCadastro() {
  const imgs: string = "https://imoveisvaledosinos.com.br/wp-content/uploads/mercado-publico.jpg";
  const [dados, setDados] = useState<Casa>();
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
  const [url, setUrl] = useState('http://localhost:3000/readCasa/');
  const [urlInsertUpdate, setUrlInsertUpdate] = useState(url);
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

  useEffect(() => { 
      async function insertUpdate() {
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
        hospedes: hospedes,
        moradia: moradia

        };
        
        const resposta = await fetch(urlInsertUpdate, {
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
      setUrl('http://localhost:3000/readCasa/');
      insertUpdate();

    },[urlInsertUpdate]);

  return (
<>

<div className="container">
<div className="row">


{(acao=='tabela') &&
 dados && (

<div>
  <form onSubmit={event => {
    setUrl(`http://localhost:3000/readCasa/`);
    setAcao('inserir');
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
                <th scope="col">Anfitrião</th>
                <th scope="col">Local</th>
                <th scope="col">Cidade</th>
                <th scope="col">Estado</th>
                <th scope="col">Ação</th>
              </tr>

              {dados.map((dados: Casa) =>{
              const idparams = dados._Id;
                return(
                 
                <tr className='evenRow'>
                  <td scope="row">{dados.anfitriao}</td>
                  <td scope="row">{dados.local}</td>
                  <td scope="row">{dados.cidade}</td>
                  <td scope="row">{dados.estado}</td>
                  <td scope="row">
                  <form onSubmit={event => {
                     setAcao('alterar');
                     setUrl(`http://localhost:3000/readCasa/${dados._Id}/`);
                      event.preventDefault();
                  }}
                  style={
                    { 
                      float: 'left' , 
                      display: 'inline-block'
                    }}>
                  <button
                    className='btn btn-warning'
                    type="submit">
                    Editar
                  </button>
                  </form>
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


{(acao=='inserir') && (
  <form onSubmit={event => {
    setAcao('tabela');
     setUrlInsertUpdate(`http://localhost:3000/insertCasa/`);
     event.preventDefault();
}}>


<div className="col">
    <div className="card" style={{width: '80%'}}>
      <div className="card-body">
        <div className="card-caption">


        <p className="form-control">
          Descrição: 
          <input 
          type="text" 
          name="local"
          value={(dados)? dados.local:''}
          className= "form-control"
          onChange={(event)=>{
            setLocal(event.target.value);
          }}
          required
        />     
        </p>

        <p className="form-control">
          Cidade:
          <input 
          type="text" 
          name="cidade"
          value={(dados)? dados.cidade:''}
          className= "form-control"
          onChange={(event)=>{
            setCidade(event.target.value);
          }}
          required
          pattern="[a-zA-Záãâéêíîóôõú\s]+$"
        />
          
          </p>

          <p className="form-control">
          Estado:
          <input 
          type="text" 
          name="estado"
          value={(dados)? dados.estado:''}
          className= "form-control"
          onChange={(event)=>{
            setEstado(event.target.value);
          }}
          required
          pattern="[A-Z]+$"
        />
          
          </p>

          <p className="form-control">
          Anfitrião:
          <input 
          type="text" 
          name="anfitriao"
          value={(dados)? dados.anfitriao:''}
          className= "form-control"
          onChange={(event)=>{
            setAnfitriao(event.target.value);
          }}
          required
          pattern="[a-zA-Záãâéêíîóôõú\s]+$" 
        />
        </p>
       </div>
       <p className="form-control">
         <a href="#" className="card-link"><img src={imgs} width="98%" height="320px"/></a>
         </p>
        <hr/>

        <div className="leftPosition">
        <p className="form-control">
           Tipo de Moradia:[Casa, Apartamento, Cabana]
          <input 
            type="text" 
            name="moradia"
            value={(dados)? dados.moradia:''}
            className= "form-control"
            onChange={(event)=>{
            setMoradia((event.target.value));
          }}
          required
          pattern="[a-zA-Záãâéêíîóôõú\s]+$" 
        />
              </p> 
        <p className="form-control">
         Quarto: 
         <input 
          type="text" 
          name="quartos"
          value={dados?dados.quartos:''}
          className= "form-control"
          onChange={(event)=>{
            setQuartos(parseInt(event.target.value));
          }}
          required
          pattern="[0-9]+$"
        />
        </p>
        
        <p className="form-control">
        <label className="form-label">Camas</label>
         <input 
          type="text" 
          name="camas"
          value={dados?dados.camas:''}
          className= "form-control"
          onChange={(event)=>{
            setCamas(parseInt(event.target.value));
          }}
          required
          pattern="[0-9]+$"
        />
          <div className="valid-feedback">
            Ok!
          </div>
        </p>

        <p className="form-control">
         Banheiros
         <input 
          type="text" 
          name="banheiros"
          value={dados?dados.banheiros:''}
          className= "form-control"
          onChange={(event)=>{
            setBanheiros(parseInt(event.target.value));
          }}
          required
          pattern="[0-9]+$"
        />
        </p>
        <p className="form-control">
          Hóspedes:
          <input 
          type="text" 
          name="hospedes"
          value={dados?dados.hospedes:''}
          className= "form-control"
          onChange={(event)=>{
            setHospedes(parseInt(event.target.value));
          }}
          required
          pattern="[0-9]+$"
          
        />
        </p>
                
        </div>

        <button
        className='btn btn-success'
        type="submit">
          Salvar</button>
        <button
        className='btn btn-danger'
        type="reset">
          Limpar</button>
        </div>

      </div>
    </div>
    </form>
)}


{(acao=='alterar') && (
  
  dados && (
  <form onSubmit={event => {
    setAcao('tabela') 
    setUrlInsertUpdate(`http://localhost:3000/updateCasa/${Id}/`);
     event.preventDefault();

}}>


<div className="col">
    <div className="card" style={{width: '80%'}}>
      <div className="card-body">
        <div className="card-caption">


        <p className="form-control">
          Descrição: 
          <input 
          type="text" 
          name="local"
          value={dados.local}
          className= "form-control"
          onChange={(event)=>{
            setLocal(event.target.value);
          }}
          required
        />     
        </p>

        <p className="form-control">
          Cidade:
          <input 
          type="text" 
          name="cidade"
          value={dados.cidade}
          className= "form-control"
          onChange={(event)=>{
            setCidade(event.target.value);
          }}
          required
          pattern="[a-zA-Záãâéêíîóôõú\s]+$"
        />
          
          </p>

          <p className="form-control">
          Estado:
          <input 
          type="text" 
          name="estado"
          value={dados.estado}
          className= "form-control"
          onChange={(event)=>{
            setEstado(event.target.value);
          }}
          required
          pattern="[A-Z]+$"
        />
          
          </p>

          <p className="form-control">
          Anfitrião:
          <input 
          type="text" 
          name="anfitriao"
          value={dados.anfitriao}
          className= "form-control"
          onChange={(event)=>{
            setAnfitriao(event.target.value);
          }}
          required
          pattern="[a-zA-Záãâéêíîóôõú\s]+$" 
        />
        </p>
       </div>
       <p className="form-control">
         <a href="#" className="card-link"><img src={imgs} width="98%" height="320px"/></a>
         </p>
        <hr/>

        <div className="leftPosition">
        <p className="form-control">
           Tipo de Moradia:[Casa, Apartamento, Cabana]
          <input 
            type="text" 
            name="moradia"
            value={dados.moradia}
            className= "form-control"
            onChange={(event)=>{
            setMoradia((event.target.value));
          }}
          required
          pattern="[a-zA-Záãâéêíîóôõú\s]+$" 
        />
              </p> 
        <p className="form-control">
         Quarto: 
         <input 
          type="text" 
          name="quartos"
          value={dados.quartos}
          className= "form-control"
          onChange={(event)=>{
            setQuartos(parseInt(event.target.value));
          }}
          required
          pattern="[0-9]+$"
        />
        </p>
        
        <p className="form-control">
        <label className="form-label">Camas</label>
         <input 
          type="text" 
          name="camas"
          value={dados.camas}
          className= "form-control"
          onChange={(event)=>{
            setCamas(parseInt(event.target.value));
          }}
          required
          pattern="[0-9]+$"
        />
          <div className="valid-feedback">
            Ok!
          </div>
        </p>

        <p className="form-control">
         Banheiros
         <input 
          type="text" 
          name="banheiros"
          value={dados.banheiros}
          className= "form-control"
          onChange={(event)=>{
            setBanheiros(parseInt(event.target.value));
          }}
          required
          pattern="[0-9]+$"
        />
        </p>
        <p className="form-control">
          Hóspedes:
          <input 
          type="text" 
          name="hospedes"
          value={dados.hospedes}
          className= "form-control"
          onChange={(event)=>{
            setHospedes(parseInt(event.target.value));
          }}
          required
          pattern="[0-9]+$"
          
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
        className='btn btn-success'
        type="submit">
          Salvar</button>
        <button
        className='btn btn-danger'
        type="reset">
          Limpar</button>
        </div>

      </div>
    </div>
    </form>
))}


</div>
    </div>

    </>


)


}