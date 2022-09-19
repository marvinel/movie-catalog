import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import './Header.css';

function Header() {



  const [buscar, setBuscar] = useState('')

  //obtenemos el valor a buscar 
  const handleOnChange = (event) => {
    setBuscar(event.target.value);
  };

  //Enviamos lo que vamos a buscar por la url
  const handleOnSubmit = (event) => {
    event.preventDefault();
    window.location.href = '/home/' + buscar;
  }

  return (
    <header className="header-container">
    
      <div className="logo-header">
        <img src={require('../../assets/film-slate.png')} alt="logo" />
        <p>Marfilms</p>
      </div>
      <div className="search">
        <form onSubmit={handleOnSubmit}>
          <input type="text" placeholder="Buscar" value={buscar} onChange={handleOnChange} />
        </form>
        <SearchIcon className="icon" />
      </div>
      <ul className="navigation">
        <li><a href="/home" >Home</a></li>
        <li><Link to="/" >Login</Link></li>
        <li><Link to="#" >About</Link></li>
      </ul>



    </header>
  );
}

export default Header;