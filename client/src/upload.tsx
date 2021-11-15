import React,{ Component, useState, useEffect } from "react"
import Axios from 'axios'
import Dropzone from "react-dropzone";
//https://celke.com.br/new/material-gratuito-baixar/formulario-upload-react

export default function App() {
   const [nome, setNome] = useState('');



  function handleSubmit(){
   
    const dados = new FormData();
    dados.append('image', nome);
    

    return fetch('http://localhost:3000/upload-image/', {
        method: 'POST',
        body: JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => console.log(data));   
  }




    return (
        <div>
            <form onSubmit={handleSubmit}>
                
                <label>
                    Arquivo
                    <input type="file" name="image"  onChange={(event=>{
                        setNome(event.target.value);
                    })}/>
                </label>
                <input type="submit" value="Add to DB" />
            </form> 
        </div>
    );
}
