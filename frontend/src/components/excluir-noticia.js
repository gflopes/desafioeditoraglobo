import React, { Component } from 'react';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment';

export default class ExcluirNoticia extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            titulo: '',
            conteudo: '',
            dataPublicacao: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/noticias/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    titulo: response.data.titulo,
                    conteudo: response.data.conteudo,
                    dataPublicacao: moment(response.data.dataPublicacao).format('DD/MM/YYYY')
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();

        axios.delete('http://localhost:3001/api/noticias/' + this.props.match.params.id)
            .then(res => console.log(res.data));
        
        toast.success('Notícia excluída com sucesso', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    }

    render() {
        return (
            <div>
                <h3 align='center'>Excluir Notícia</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'> 
                        <label>Título: </label>
                        <input  type='text'
                                readOnly
                                className='form-control'
                                value={this.state.titulo}
                                onChange={this.onChangeNoticiaTitulo}
                                />
                    </div>
                    <div className='form-group'>
                        <label>Conteúdo: </label>
                        <textarea readOnly className='form-control' value={this.state.conteudo} onChange={this.onChangeNoticiaConteudo} />
                    </div>
                    <div className='form-group'>
                        <label>Data de Publicação: </label>
                        <input  type='text' 
                                readOnly
                                className='form-control'
                                value={this.state.dataPublicacao}
                                onChange={this.onChangeNoticiaDataPublicacao}
                                />
                    </div>

                    <br />

                    <div className='form-group'>
                        <input type='submit' value='Excluir' className='btn btn-primary' />
                    </div>

                    <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            />
                    <ToastContainer />
                </form>
            </div>
        )
    }
}