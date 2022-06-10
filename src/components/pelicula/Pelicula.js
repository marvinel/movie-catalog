import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import StarBorderIcon from '@mui/icons-material/StarBorder';
//import Lottie from "lottie-react";
//import Cargar from '../../assets/cargar.json';

import './Pelicula.css';


function Pelicula(props) {

    const DETAILS_API = "https://api.themoviedb.org/3/movie/";
    const apikey = "?api_key=b3b740f364ab0fa9fbc9b2b4dbb84e72&language=es";
    const IMAGE_API = "https://image.tmdb.org/t/p/w400";

    const [movie, setmovie] = useState([])

    
    //Obtenemos los detalles de la pelicula seleccionada mediante el id que llega por la url
    useEffect(() => {
        console.log(props.id)
       axios.get(DETAILS_API + props.id + apikey)
            .then(res => {
                
                setmovie(res.data)
            });
    }, []);

    //Cambiamos los minutos a horas
    const duracion = () =>{
        let duracion = movie.runtime / 60
        let decimal= (duracion % 1)*60
       

        duracion = Math.floor(duracion)
        decimal = Math.floor(decimal)
      
        return (duracion+"h "+decimal+"m")
    }

    //Comprobamos que la información ya cargó
    if (movie.title) {
        return (
            <div className="posterII">
                <div className="poster"
                    style={{
                        margin: 0,
                        minHeight: '88vh',
                        backgroundImage: 'url(https://image.tmdb.org/t/p/original/' + movie.backdrop_path + ')',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                        position: 'absolute',
                        width: '100%',
                        zIndex: -1
                    }} >
                    <section className="detail-container">
                        <div className="datail-contentp">
                            <img src={IMAGE_API + movie.poster_path} alt={movie.title} />
                        </div>
                        <div className="datail-content">
                            <section >
                                <div>
                                    <h2>
                                        {movie.title}
                                        <span> ({movie.release_date})</span>
                                    </h2>
                                    <ul className="generos">
                                        {
                                            movie.genres.map(item => (
                                                <li className="li_generos" key={item.id}>{item.name}, </li>
                                            ))
                                        }
                                        <span> <strong>{duracion()}</strong> </span>
                                    </ul>
                                </div>
                                <div>
                                    <h3>{movie.vote_average} Puntuación</h3>
                                    <Rating
                                        readOnly
                                        name="customized-empty"
                                        value={movie.vote_average}
                                        max={10}

                                        precision={0.5}
                                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                    />
                                </div>
                                <div>
                                    <h3>Vista General</h3>
                                    <p>{movie.overview}</p>
                                </div>
                            </section>
                        </div>
                    </section>
                </div>
            </div>
        );
    } else {
        return (
            <div>
Cargando...
               { //<Lottie animationData={Cargar} style={{ width: '300px', margin: '0 auto' }} />;
    }
            </div>
        )
    }
}

export default Pelicula;