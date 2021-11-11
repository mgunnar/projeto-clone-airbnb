import oferta from './../src/img/oferta.jpg';
import reserva from './../src/img/reserva.png';

export default function PaginaPrincipal() {
  return (
    <div className = "alinharDivCentro">
      <div className="container">
        <div className="row">

          <div className="col">
            <div className="card" style={{width: 300}}>
              <div className="card-body">
                <h5 className="card-title">OFERTAS</h5>
                <h6 className="card-subtitle mb-2 text-muted"></h6>
                <p className="card-text">
                  <a href = '/ofertas'><img src = {oferta} width="270px" height="220px"/></a>
                </p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card" style={{width: 300}}>
              <div className="card-body">
                <h5 className="card-title">RESERVAS</h5>
                <h6 className="card-subtitle mb-2 text-muted"></h6>
                <p className="card-text">
                  <a href = '/reserva'><img src = {reserva} width="270px" height="220px"/></a>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
  }