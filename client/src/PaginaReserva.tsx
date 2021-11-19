import axios from "axios";

function main(){
const url= {
  "add": 'http://localhost:3000/insertCasa/',
  "update": 'http://localhost:3000/updateCasa/2',
  "get": 'http://localhost:3000/readCasa',
  "delete": 'http://localhost:3000/deleteCasa/2'
};

//api com axios
const newCasa = {
  anfitriao: "Fabio",
  estado:'RS' ,
  local: 'Hotel Maré',
  cidade: 'Viamão',
  quartos: 1,
  camas: 2,
  banheiros: 2,
  hospedes: 1,
  moradia: 'Casa'
}

const updateCasas = {
  anfitriao: "Fabio",
  estado:'RS' ,
  local: 'Hotel Maré',
  cidade: 'Viamão',
  quartos: 1,
  camas: 2,
  banheiros: 2,
  hospedes: 1,
  moradia: 'Casa'
}

function getCasa(){
  //promise> Certo-> then/ erro=> catch
  axios.get(url.get)
  .then(response =>{
    const data = response.data;
    //divId.textContent = JSON.stringify(data);
    const dados = JSON.stringify(data);
  })
  .catch(error=> console.log(error));
}

function addNewCasa(){
  axios.post(url.add, newCasa)
  .then(response=>{
    alert(JSON.stringify(response.data));
  })
    .catch(error => console.log(error));
}

function updateCasa(){
  axios.put(url.update, updateCasas)
  .then(response =>{
    alert(JSON.stringify(response.data));
  })
  .catch(error => console.log(error));
}

function deleteCasa(){
  axios.delete(url.delete)
  .then(response=> {
    alert(JSON.stringify(response.data));
  })
  .catch(error => console.log(error));
}

}
//getCasa();
//updateCasa();
//deleteCasa();
//addNewCasa();
export default main();