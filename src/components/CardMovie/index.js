import React, {Component} from 'react';
import {Card, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import './style.css';


class CardMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {filme} = this.props;
        return (

                <Col md={3} className="cardFilme">
                    <Link to={`/movie/${filme.id}`}>
                        <Card>
                            {filme.poster_path === null ? (
                                <Card.Img variant="top" src='https://via.placeholder.com/259x400'/>
                            ) : (<Card.Img variant="top"
                                           style={{backgroundImage: `url(${process.env.REACT_APP_BASE_URL_IMAGE_API + filme.poster_path})`}}/>)}
                            <div className="overlay">
                                <div className="text">
                                    {filme.overview}
                                </div>
                            </div>
                        </Card>
                    </Link>
                </Col>
        )
    }
}

export default CardMovies;
