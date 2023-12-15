import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';

function EventCarousel(props) {
    const { id, title, about, imgUrl, date } = props;
    const navigate = useNavigate()
    const eventButtonHandler = () => {
        console.log()
        navigate('/event/' + id)
    }
    return (
        <Card style={{ width: '250px', height: '300px', margin: '20px', borderStyle: 'none' }}>
        <Card.Img variant="top" src={imgUrl} style={{margin:'auto', width: '150px', height: '200px'}}/>
        <Card.Body>
            <Button variant="outline-primary" onClick ={eventButtonHandler} style={{width:'60%', borderRadius:'20px'}}>Buy Tickets</Button>
        </Card.Body>
        </Card>
    );
}

export default EventCarousel;