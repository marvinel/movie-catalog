import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/home/Home'
//import Error from './components/error/Error';
import Header from './components/header/Header';
//import Pelicula from './components/pelicula/Pelicula'
export default function Router(props) {

    return (
        <BrowserRouter>
          <Header />
          <Routes>
                <Route exact path="/"  component={Home}/>      
                <Route exact path="/home/:query?"  component={Home}/>
            { //   <Route exact path="/details/:id"  component={Pelicula}/>
                 }
            </Routes>
        </BrowserRouter>
    );
  }