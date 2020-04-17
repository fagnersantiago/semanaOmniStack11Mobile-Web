import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import{FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import './style.css';

export default function NewIncident(){

  const [title, setTitle] = useState('');
  const [descriptions, setDescriptions] = useState('');
  const [value, setValue] = useState('');
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();

 async function handleNewIncidents(e){

    e.preventDefault();

    const data = {

      title,
      descriptions,
      value,

    };

    try {

      await api.post('incidents', data, {

        headers: {
    
          Authorization: ongId,

        }

      });

       history.push('/profiles');
      
    } catch (err) {

      alert('Erro ao cadastrar, tente novamente');
      
    }

  }


    return(
        <div className="new-incident-container">
            <div className="content">
              <section>
                 <img src={logoImg} alt="The Be Hero" />
                   <h1>Cadastro</h1>
                
                <p>Faça seu cadastro, entre na plataforma e ajude as pessoas da sua ONG</p>

                <Link className="back-link" to="/profiles">
                  <FiArrowLeft size={16} color ="#E02041"/>
                    Voltar para Home
                </Link>

              </section>

             <form >
                 <input 
                 placeholder="Titulo do Caso"
                 value={title}
                 onChange={e =>setTitle (e.target.value)}
                 
                 />

                 <textarea 
                 placeholder="Descrição"
                 value={descriptions}
                 onChange={e => setDescriptions (e.target.value)}

                 />
                 
                 <input 
                 placeholder="Valor em reais"
                 value={value}
                 onChange ={e => setValue(e.target.value)}
                 
                 />

                <button onClick={handleNewIncidents} className ="button" type="submit">Cadastrar</button>             
            </form>

            </div>

        </div>
    )
}