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
    moradia:  string;
}

export interface Reserva{
    [x: string]: any;
    idcasa:      Number;
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