import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import { Fade } from 'react-awesome-reveal';

function EventCard(props) {
  const { id, title, about, imgUrl, date, venue } = props;
  const getDate = new Date(date);
  const formatDate = `${(getDate.getUTCMonth() + 1)
    .toString()
    .padStart(2, '0')}-${getDate
    .getUTCDate()
    .toString()
    .padStart(2, '0')}-${getDate.getUTCFullYear()}`;
  let hours = getDate.getUTCHours();
  const minutes = getDate.getUTCMinutes().toString().padStart(2, '0');
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const formatTime = `${hours}:${minutes} ${amOrPm}`;
  const navigate = useNavigate();
  const eventButtonHandler = () => {
    console.log();
    navigate('/event/' + id);
  };
  return (
    <Fade triggerOnce={true} direction={'left'} cascade={true}>
    <Card
      style={{
        width: '250px',
        height: '400px',
        margin: '20px',
        borderStyle: 'none',
      }}
    >
      <Card.Img
        variant="top"
        src={imgUrl}
        style={{ margin: 'auto', width: '150px', height: '200px' }}
      />
      <Card.Body>
        <Card.Title>
          <b>{title}</b>
        </Card.Title>
        <Card.Text>{venue}</Card.Text>
        <Card.Text>
          {dayjs(formatDate).format('DD MMM YYYY')} <b>{formatTime}</b>
        </Card.Text>
        <Button variant="success" onClick={eventButtonHandler} style={{width:'70%', borderRadius:'20px'}}>
          Buy Tickets
        </Button>
      </Card.Body>
    </Card>
    </Fade>
  );
}

export default EventCard;
