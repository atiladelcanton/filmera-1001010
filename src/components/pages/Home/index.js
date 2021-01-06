import React, {Component} from 'react';

import axios from "axios";

import {Row,Col,Form,Container} from "react-bootstrap";
import CardMovies from "../../CardMovie";
import loading from "../../../images/loading.svg"


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            movies: [],
            currentPage: 1,
            totalResults: 0,
            totalPages: 0,
            isLoading: true
        }
        this.getFilmes = this.getFilmes.bind(this);
        this.searchFilmes = this.searchFilmes.bind(this);
    }

    componentDidMount() {
        this.getFilmes();
    }

    _generateConfigAxios(page, url, params) {
        return {
            method: 'GET',
            accept: 'application/json',
            contentType: 'application/json',
            url: url,

            validateStatus: function (status) {
                return true;
            },
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'pt-BR',
                page: page,
                adult:true,
                ...params
            },
        }
    }

    getFilmes() {
        try {
            let url = `${process.env.REACT_APP_BASE_URL_API}discover/movie`;
            let config = this._generateConfigAxios(this.state.currentPage, url);
            axios.request(config)
                .then((response) => {
                    if (response.status !== 200) {
                        alert(response.data.status_message);
                        return;
                    }
                    let {total_pages, total_results, results} = response.data;
                    this.setState({
                        totalResults: total_results,
                        totalPages: total_pages,
                        movies: results
                    });
                    this.setState({isLoading: false});

                }).catch(error => console.log(`erro no axios. ${error}`));

        } catch (e) {
            console.error(`Ocorreu um erro ao consultar os filmes: ${e}`);
        }
    }
    searchFilmes() {
        if(this.state.search.length > 3){
            this.setState({isLoading: true});
            let url = `${process.env.REACT_APP_BASE_URL_API}search/movie?`;
            let config = this._generateConfigAxios(this.state.currentPage, url, {query: this.state.search});

            axios.request(config)
                .then((response) => {
                    if (response.status !== 200) {
                        alert(response.data.status_message);
                        return;
                    }
                    let {total_pages, total_results, results} = response.data;
                    this.setState({
                        totalResults: total_results,
                        totalPages: total_pages,
                        movies: results
                    });
                    this.setState({isLoading: false});

                }).catch(error => console.log(`erro no axios. ${error}`));
        }
    }
    render() {
        return (
            <>
                <Container>
                <Row className="justify-content-md-center">
                    <Col>
                        <Form.Control size="lg"
                                      type="search"
                                      placeholder="Procurar Filme"
                                      className="form-dark" value={this.state.search}
                        onChange={(event)=> {this.setState({search:event.target.value})}}
                        onKeyUp={this.searchFilmes}/>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    {
                        this.state.isLoading ?
                            (
                                <Col md="auto" className="mt-5">
                                    <img src={loading} alt='Loading' />
                                </Col>

                            ):(

                                this.state.movies.map((movie) => {
                                    return (
                                    <CardMovies filme={movie} key={movie.id}/>
                                    );
                                })
                            )
                    }

                </Row>
                </Container>
            </>
        )
    }
}


export default Home;
