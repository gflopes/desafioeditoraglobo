import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import ListarNoticia from './components/listar-noticias';
import IncluirNoticia from './components/incluir-noticia';
import EditarNoticia from './components/editar-noticia';
import ExcluirNoticia from './components/excluir-noticia';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <Link to='/' className='navbar-brand'>CRUD Notícias</Link>
            <div className='collpase navbar-collapse'>
              <ul className='navbar-nav mr-auto'>
                <li className='navbar-item'>
                  <Link to='/' className='nav-link'>Notícias</Link>
                </li>
                <li className='navbar-item'>
                  <Link to='/noticia/incluir' className='nav-link'>Nova Notícia</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path='/' exact component={ListarNoticia} />
          <Route path='/noticia/incluir' component={IncluirNoticia} />
          <Route path='/noticias/editar/:id' component={EditarNoticia} />
          <Route path='/noticias/excluir/:id' component={ExcluirNoticia} />
        </div>
      </Router>
    );
  }
}

export default App;
