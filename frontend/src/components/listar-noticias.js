import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

const Noticia = props => (
    <tr>
        <td>{props.noticia.titulo}</td>
        <td>{props.noticia.conteudo}</td>
        <td>{props.noticia.dataPublicacao}</td>
        <td>
            <Link to={'/noticias/editar/' + props.noticia._id}>Alterar</Link>
            &nbsp;|&nbsp;
            <Link to={'/noticias/excluir/' + props.noticia._id}>Excluir</Link>
        </td>
    </tr>
)

export default class ListarNoticia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noticias: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/noticias')
            .then(response => {
                this.setState({
                    noticias: response.data.noticias
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <h3>Lista de Notícias</h3>
                <table className='table table-striped' style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th className='col-xs-4'>Título</th>
                            <th className='col-xs-6'>Conteúdo</th>
                            <th className='col-xs-1'>Data de Publicação</th>
                            <th className='col-xs-1 text-left'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.listarNoticias()
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    listarNoticias() {
        return this.state.noticias.map(function(noticiaLida, i){
            return <Noticia noticia={noticiaLida} key={i} />;
        })
    }
}