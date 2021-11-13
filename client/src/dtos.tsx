export interface Casa {
    [x: string]:    any;
   // _id:        string;
    anfitriao:  string;
    local:      string;
    cidade:     string;
    estado:     string;
    quartos:    number;
    camas:      number;
    banheiros:  number;
    hospedes:   number;
}

export interface Reserva extends Casa{
    [x: string]: any;
    idcasa:      Casa;
    checkin:     Date;
    checkout:    Date;
    nome:      string;
    telefone:   number
}

export interface Cols{
    dataField: string,
      text: string,
      sort:string
}