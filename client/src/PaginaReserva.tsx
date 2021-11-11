
export default function PaginaReserva() {
    const imgs: string = "https://imoveisvaledosinos.com.br/wp-content/uploads/mercado-publico.jpg";
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

              <p className="card-text">
                Check-In: dateObject
              </p>
              <p className="card-text">
                Check-Out: dateObject 
              </p>
              <p className="card-text">
               Nome:
              </p>
              <p className="card-text">
               Telefone:
              </p>
              <p className="card-text">
                
              </p>
              <p className="card-text">
               
              </p>
              <p className="card-text">
               
              </p>
              <button>Aprovar</button>
              <button>Recusar</button>
              </div>

            </div>
          </div>
          </div>
          </div>
          </div>
    
    
       )
     
      
    }