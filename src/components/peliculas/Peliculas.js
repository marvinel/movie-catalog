import React from 'react';
import './Peliculas.css';
function Peliculas({ title, poster_path }) {

  const IMAGE_API = "https://image.tmdb.org/t/p/w400";

  return (
    <div className="movie">
      <img src={IMAGE_API + poster_path} alt={title} />
      <div className="movie-info">
        <h3>{title}</h3>

      </div>


    </div>
  );
}

export default Peliculas;