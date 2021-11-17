import React, {useRef, useState, useEffect} from 'react';
import "./App.css";
import {Casa} from './dtos';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import { useNavigate, useParams } from 'react-router';
import { Axios } from 'axios';
import { isTypeOnlyImportOrExportDeclaration } from 'typescript';
//npm i react-toastify
//https://wbruno.com.br/html/validando-formularios-apenas-com-html5/

export default function PaginaCadastro() {

  let parametros = useParams();
  let id: string = parametros.id!;
  let navigate = useNavigate();
  const imgs: string = "https://imoveisvaledosinos.com.br/wp-content/uploads/mercado-publico.jpg";
  const [dados, setDados] = useState<Casa>();
  const [acao, setAcao] = useState('tabela');
  const [Id, setId] = useState(id);

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
  const [url, setUrl] = useState(`http://localhost:3000/readCasa/${id}/`);
  
  const Talter=   () => toast.success('Prencha todos os campos, informações enviadas!');
  const Terror =  () => toast.error('Não foi possível completar essa ação!!');
  const Twaiting= () => toast.info('Carregando...');
  const Treset=   () => toast.info('Limpeza de campos concluída');

  async function putData() {
    const id: string = Id;
     const putData:Casa = {
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


      try{

        if((anfitriao=='')||
          (local=='')||
          (cidade=='')||
          (estado=='')||
          (moradia=='')||
          (quartos==0)||
          (camas==0)||
          (banheiros==0)||
          (hospedes==0))
          {}else{

        const resposta = await fetch(`http://localhost:3000/updateCasa/${id}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(putData)
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
      }
      } catch (error) {
        setErro(true);
      }
      navigate('/cadastro');
      setCarregando(false);
    }
  
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

 return (
  <>
    <div className="container">
    <div className="row">
    <form>
  {erro && <div>Não encontramos itens!</div>}
      {carregando ? (
        <div>Carregando...</div>
      ) : (
      dados && (
  
        <div className="col">
         <div className="card" style={{width: '80%'}}>
          <div className="card-body">
            <div className="card-caption">   
             <p className="form-control">
              <b>Descrição oferta: </b> {dados.local}
               <h6> Nova oferta: 
                <input 
                  type="text" 
                  name="local"
                  className= "form-control"
                  onChange={(event)=>{
                    setLocal(event.target.value);
                  }}
                  required
                />  
              </h6>   
             </p>
             
             <p className="form-control">
                <b>Cidade:</b> {dados.cidade}
                <h6> Nova cidade: 
                   <input 
                      type="text" 
                      name="cidade"
                      className= "form-control"
                      onChange={(event)=>{
                        setCidade(event.target.value);
                      }}
                      required
                      pattern="[a-zA-Záãâéêíîóôõú\s]+$"
                    />
                  </h6>
                </p>
              
                <p className="form-control">
                  <b>Estado:</b> {dados.estado}
                  <h6> Novo Estado: 
                  <input 
                    type="text" 
                    name="estado"
                    className= "form-control"
                    onChange={(event)=>{
                      setEstado(event.target.value);
                    }}
                    required
                    pattern="[A-Z]+$"
                  />
                </h6>
              </p>

              <p className="form-control">
                <b>Anfitrião:</b> {dados.anfitriao}
                <h6> Novo Anfitrião: 
                <input 
                  type="text" 
                  name="anfitriao"
                  className= "form-control"
                  onChange={(event)=>{
                    setAnfitriao(event.target.value);
                  }}
                  required
                  pattern="[a-zA-Záãâéêíîóôõú\s]+$" 
                />
                </h6>
              </p>
            </div>
  
            <p className="form-control">
              <a href="#" className="card-link"><img src={imgs} width="98%" height="320px"/></a>
            </p>
            <hr/>
            <div className="leftPosition">
              <p className="form-control">
              <b>Tipo de Moradia:</b> {dados.moradia}
              <h6> Novo tipo: 
                <input 
                type="text" 
                name="moradia"
                className= "form-control"
                onChange={(event)=>{
                  setMoradia((event.target.value));
                }}
                required
                pattern="[a-zA-Záãâéêíîóôõú\s]+$" 
              />
              </h6>
             </p> 
      
              <p className="form-control">
                <b>Quartos:</b> {dados.quartos}
                <h6> Novos quartos: 
                  <input 
                    type="text" 
                    name="quartos"
                    className= "form-control"
                    onChange={(event)=>{
                      setQuartos(parseInt(event.target.value));
                    }}
                    required
                    pattern="[0-9]+$"
                  />
                </h6>
              </p>  
        
              <p className="form-control">
                <b>Camas:</b> {dados.camas}
                <h6> Novas camas: 
                  <input 
                    type="text" 
                    name="camas"
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
                </h6>
              </p>

              <p className="form-control">
                <b>Banheiros:</b> {dados.banheiros}
                <h6> Novos banheiros: 
                  <input 
                    type="text" 
                    name="banheiros"
                    className= "form-control"
                    onChange={(event)=>{
                      setBanheiros(parseInt(event.target.value));
                    }}
                    required
                    pattern="[0-9]+$"
                  />
                </h6>
              </p>
          
              <p className="form-control">
                <b>Hóspedes:</b> {dados.hospedes}
                <h6> Novos hóspedes: 
                  <input 
                    type="text" 
                    name="hospedes"
                    className= "form-control"
                    onChange={(event)=>{
                      setHospedes(parseInt(event.target.value));
                    }}
                    required
                    pattern="[0-9]+$"
                  />
                </h6>
              </p>

             <button className="btn btn-sm btn-success"     
                onClick={
                  (event=>{
                    putData();
                    Talter();})}> Salvar</button>
                 <button
                className='btn btn-sm btn-danger'
                type="reset"
                onClick={(event=>{Treset();})}>
                Limpar</button>
              </div>
            </div>
          </div>
        </div>
         ))
        }
        </form>
      </div>
    </div>
   </>
  )

}


