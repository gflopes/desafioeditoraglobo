import React, { Component } from 'react';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class EditarNoticia extends Component {

    constructor(props) {
        super(props);

        this.onChangeNoticiaTitulo = this.onChangeNoticiaTitulo.bind(this);
        this.onChangeNoticiaConteudo = this.onChangeNoticiaConteudo.bind(this);
        this.onChangeNoticiaDataPublicacao = this.onChangeNoticiaDataPublicacao.bind(this);
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
                    dataPublicacao: response.data.dataPublicacao
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeNoticiaTitulo(e) {
        this.setState({
            titulo: e.target.value
        });
    }

    onChangeNoticiaConteudo(e) {
        this.setState({
            conteudo: e.target.value
        });
    }

    onChangeNoticiaDataPublicacao(e) {
        this.setState({
            dataPublicacao: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Notícia Enviada:`);
        console.log(`titulo: ${this.state.titulo}`);
        console.log(`conteudo: ${this.state.conteudo}`);
        console.log(`dataPublicacao: ${this.state.dataPublicacao}`);

        const noticia = {
            titulo: this.state.titulo,
            conteudo: this.state.conteudo,
            dataPublicacao: this.state.dataPublicacao
        };

        axios.put('http://localhost:3001/api/noticias/' + this.props.match.params.id, noticia)
            .then(res => console.log(res.data));
        
        toast.success('Notícia alterada com sucesso', {
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
                <h3 align='center'>Alterar Notícia</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'> 
                        <label>Título: </label>
                        <input  type='text'
                                required
                                maxLength='100'
                                className='form-control'
                                value={this.state.titulo}
                                onChange={this.onChangeNoticiaTitulo}
                                />
                    </div>
                    <div className='form-group'>
                        <label>Conteúdo: </label>
                        <textarea maxLength='1000' required className='form-control' value={this.state.conteudo} onChange={this.onChangeNoticiaConteudo} />
                    </div>
                    <div className='form-group'>
                        <label>Data de Publicação: </label>
                        <input  type='date' 
                                required
                                className='form-control'
                                value={this.state.dataPublicacao}
                                onChange={this.onChangeNoticiaDataPublicacao}
                                />
                    </div>

                    <div className='form-group'>
                        <input type='submit' value='Salvar' className='btn btn-primary' />
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