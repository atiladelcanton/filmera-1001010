import React,{Component} from 'react';
import {Row,Col,Container,Media} from "react-bootstrap";
import axios from "axios";

import loading from "../../../images/loading.svg"
import './index.css';
class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {movie: [],isLoading: true};
        this.getDetailMovie = this.getDetailMovie.bind(this);
    }
    componentDidMount(){
        this.getDetailMovie()
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
                ...params
            },
        }
    }
    getDetailMovie(){

        try {
            let url = `${process.env.REACT_APP_BASE_URL_API}movie/${this.props.match.params.id}`;
            let config = this._generateConfigAxios(this.state.currentPage, url);
            axios.request(config)
                .then((response) => {
                    if (response.status !== 200) {
                        console.warn(response.data.status_message);
                        return;
                    }
                    console.log(response.data);
                    this.setState({
                        isLoading: false,
                        movie: response.data
                    });


                }).catch(error => console.log(`erro no axios. ${error}`));

        } catch (e) {
            console.error(`Ocorreu um erro ao consultar os filmes: ${e}`);
        }
    }

    render(){
        return (
            <>
                <Container fluid={true}>
                    <Row className="justify-content-md-center">
                        {
                            this.state.isLoading ?
                                (
                                    <Col md="auto" className="mt-5">
                                        <img src={loading} alt='Loading' />
                                    </Col>

                                ):(
                                    <Col>
                                       <div className="bg_cover"  style={{ backgroundImage: `url(${process.env.REACT_APP_BASE_URL_IMAGE_FULL_HD_API+this.state.movie.backdrop_path})` }}>
                                                <div className="overlay"></div>
                                                <Container>
                                                    <Col>
                                                        <section className="container-header">
                                                            <Media>
                                                                <img
                                                                    width={300}
                                                                    className="mr-3"
                                                                    src={process.env.REACT_APP_BASE_URL_IMAGE_API+this.state.movie.poster_path}
                                                                    alt={this.state.movie.title}
                                                                />
                                                                <Media.Body>
                                                                    <h1>{this.state.movie.title}</h1>
                                                                    <span className="badge badge-dark m-2">
                                                                        {this.state.movie.release_date.substr(0, 10).split('-').reverse().join('/')}
                                                                    </span>
                                                                    <span className="badge badge-dark m-2">
                                                                        {this.state.movie.budget.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                                                                    </span>
                                                                    {this.state.movie.genres.map(genre => {
                                                                        return(
                                                                            <span className="badge badge-success mb-2 m-2" key={genre.id}>
                                                                                {genre.name}
                                                                            </span>
                                                                        )
                                                                    })}

                                                                    <div className="description">
                                                                        <p>
                                                                            {this.state.movie.overview}
                                                                        </p>
                                                                    </div>
                                                                    <h2>Empresas de Produção</h2>
                                                                    {this.state.movie.production_companies.map(company => {
                                                                        return(
                                                                            <span className="badge badge-success mb-2 m-2" key={company.id}>
                                                                                {company.name}
                                                                            </span>
                                                                        )
                                                                    })}
                                                                </Media.Body>
                                                            </Media>
                                                        </section>
                                                    </Col>
                                                </Container>
                                       </div>
                                    </Col>
                                )
                        }
                    </Row>
                </Container>
            </>
        );
    }
}
export default Detail;
