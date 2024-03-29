import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Peliculas from '../peliculas/Peliculas';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

import { createTheme } from '@mui/material/styles';

import './Home.css';
import Button from '@mui/material/Button';

import BeatLoader from "react-spinners/BeatLoader";


function Home(props) {
    const override = {
        display: "block",
        margin: "0 auto",
       
      };
    const innerTheme = createTheme({
        palette: {
          primary: {
            main:"#55a1ff",
          },
        },
      });
    const MOVIES_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&";
    const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=b3b740f364ab0fa9fbc9b2b4dbb84e72&query=";
    const apikey = "api_key=b3b740f364ab0fa9fbc9b2b4dbb84e72";

    const [movies, setmovies] = useState([])
    const [page,setpage] = useState(1)
    const [loading, setLoading] = useState(true)
    let params = useParams();
    //Obtenemos los datos buscados y los cambiamos por los que estaban
    const search = (url) => {
        axios.get(url)
            .then(res => {
                setmovies(res.data.results)
                setLoading(false)
            });
    }

    useEffect(() => {

        //Comprobamos si hay alguna busqueda y si no mostramos los datos por defecto
        setLoading(true)
           if (params.query) {
               search(SEARCH_API + params.query+"&language=es");
           } else {
          
        axios.get(MOVIES_API + apikey + "&page="+page)
            .then(res => {
                
                if(page===1){
                    setmovies( res.data.results )
                }else{
                    
                    setmovies(movies => movies.concat(res.data.results)  )
                }
                setLoading(false)
               
            });
          }
    },[page,params]);
    const cargarmas = () => {
            setpage(page+1)
      }
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
            <BeatLoader  cssOverride={override}  loading={loading}  size={50} />
            
            
            <Button style={{margin:'10px'}} className='btn-cargar' variant="contained" onClick={ cargarmas} theme={innerTheme} >Cargar mas</Button>
        </div>
    );
}

export default Home;