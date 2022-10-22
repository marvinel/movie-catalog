import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import StarBorderIcon from '@mui/icons-material/StarBorder';
//import Lottie from "lottie-react";
//import Cargar from '../../assets/cargar.json';
import { useParams } from "react-router-dom";
import './Pelicula.css';

import { Link } from 'react-router-dom';
import noimage from '../../assets/noimage.svg';
import BeatLoader from "react-spinners/BeatLoader";
function Pelicula(props) {

    const DETAILS_API = "https://api.themoviedb.org/3/movie/";
    const apikey = "?api_key=b3b740f364ab0fa9fbc9b2b4dbb84e72";
    const IMAGE_API = "https://image.tmdb.org/t/p/w400";




    const [movie, setmovie] = useState([])
    const [recommendations, setRecommendations] = useState([])
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(true)
    let params = useParams();

    const override = {
        display: "block",
        margin: "0 auto",


    };
    //Obtenemos los detalles de la pelicula seleccionada mediante el id que llega por la url
    useEffect(() => {
        setLoading(true)
        setLoading2(true)
        axios.get(DETAILS_API + params.id + apikey)
            .then(res => {

                setmovie(res.data)
                setLoading(false)
                
            });
        axios.get(DETAILS_API + params.id + "/recommendations" + apikey)
            .then(res => {
                console.log(res.data)
                setRecommendations(res.data)
                setLoading2(false)
            })
    }, [params]);

    //Cambiamos los minutos a horas
    const duracion = () => {
        let duracion = movie.runtime / 60
        let decimal = (duracion % 1) * 60


        duracion = Math.floor(duracion)
        decimal = Math.floor(decimal)

        return (duracion + "h " + decimal + "m")
    }

    const voteaverage = (vote) => {

        return (Math.round((vote + Number.EPSILON) * 10) / 100) * 100;
    }
    const verificarimagen = (item) => {
        console.log(item)
        if (item) {
            return IMAGE_API +item
        } else {
            return noimage;
        }
    }
    //Comprobamos que la información ya cargó
    
        return (
            <div className="posterII">
                {movie.title ? 
                <div className="poster"
                    style={{
                        margin: 0,

                        backgroundImage: 'url(https://image.tmdb.org/t/p/original/' + movie.backdrop_path + ')',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                        position: 'relative',
                        width: '100%',
                        zIndex: -1
                    }} >
                    <section className="detail-container">
                        <div className="datail-contentp">
                            <img src={verificarimagen( movie.poster_path)} alt={movie.title} />
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
                                    <h3>{movie.vote_average} Vote Average</h3>
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
                                    <h3>Overview</h3>
                                    <p>{movie.overview}</p>
                                </div>
                            </section>
                        </div>
                    </section>
                </div>:
                <BeatLoader  cssOverride={override}  loading={loading}  size={50} />

}
                <div className='Reco-container'>
                    <h3>Recommendations</h3>
                    {recommendations.results ? 
                    <div className='Recomendaciones'>
                        {
                            recommendations.results.map((item) => (
                                <div className='Recomendaciones-item' key={item.id}>

                                    <div className='Imagen-content'>
                                        <Link className='sgt-peli' to={"/details/" + item.id}>
                                            <img src={verificarimagen( item.backdrop_path)} alt={item.title} />
                                            <div className='mini-info'>
                                                <p>{item.release_date}</p>
                                                <p>{voteaverage(item.vote_average)}%</p>
                                                <span></span>
                                            </div>
                                        </Link>
                                    </div>
                                    <p>{item.title}</p>

                                </div>
                            ))
                         
                        }
                        {
                            recommendations.results.length === 0 && <h3>NO HAY RECOMENDACIONES...</h3>
                        }
                    </div>:
                     <BeatLoader  cssOverride={override}  loading={loading2}  size={50} />
                    }
                </div>
            </div>
        );

}

export default Pelicula;