import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home'
//import Error from './components/error/Error';
import Header from './components/header/Header';
import Pelicula from './components/pelicula/Pelicula';
export default function Router(props) {

  return (

    <div >
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route  path="home" element={<Home />} >
          <Route path=":query" element={<Home />} />
        </Route >
        <Route  path="details" element={<Pelicula />} >
          <Route path=":id" element={<Pelicula />} />
        </Route >
       
      </Routes>
    </div>

  );
}