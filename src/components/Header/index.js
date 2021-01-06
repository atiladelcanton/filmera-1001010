import React from 'react'
import {Link} from 'react-router-dom';
import logo from '../../images/logo.png';
import {Logo} from './style';
import {Row,Col,Container} from 'react-bootstrap';
const Header = (props) => <Container><Row className="justify-content-md-center"><Col  md="auto" ><Link to="/"><Logo src={logo} alt="Filmeria"/></Link></Col></Row></Container>


export default Header;
