import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Peliculas from '../peliculas/Peliculas';
import { Link } from 'react-router-dom';
import { useSearchParams, useParams } from "react-router-dom";
import './Home.css';

function Home(props) {

    const MOVIES_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&";
    const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=b3b740f364ab0fa9fbc9b2b4dbb84e72&query=";
    const apikey = "api_key=b3b740f364ab0fa9fbc9b2b4dbb84e72&language=es";

    const [movies, setmovies] = useState([])
    let params = useParams();
    //Obtenemos los datos buscados y los cambiamos por los que estaban
    const search = (url) => {
        axios.get(url)
            .then(res => {
                setmovies(res.data.results)
               
            });
    }

    useEffect(() => {

        //Comprobamos si hay alguna busqueda y si no mostramos los datos por defecto

           if (params.query) {
               search(SEARCH_API + params.query+"&language=es");
           } else {
          
        axios.get(MOVIES_API + apikey)
            .then(res => {
                setmovies(res.data.results)
               
            });
          }
    }, []);

    return (
        <div className="home">

            <div className="movie-container">
                {
                    movies.map(pelicula => (

                        <Link key={pelicula.id} className="movie-container" to={"/details/" + pelicula.id} >
                            <Peliculas {...pelicula} />

                        </Link>


                ))
                }
            </div>

        </div>
    );
}

export default Home;