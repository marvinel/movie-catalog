import React from 'react';
import './Peliculas.css';
import noimage from '../../assets/noimage.svg';
function Peliculas({ title, poster_path }) {

  const IMAGE_API = "https://image.tmdb.org/t/p/w400";
  const verificarimagen = (poster_path) =>{
    if( poster_path){
        return IMAGE_API + poster_path
    }else{
        return noimage;
    }
}

  return (
    <div className="movie">
      <img src={verificarimagen(poster_path) }  alt={title} />
      <div className="movie-info">
        <h3>{title}</h3>

      </div>


    </div>
  );
}

export default Peliculas;