import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import GetEventDetails from '../customHooks/GetEventDetails';
import { useContext } from 'react';
import { UserContext } from '../providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';

function EventPage() {
  const {
    userId,
    setUserId,
    accountId,
    setAccountId,
    isAdmin,
    setIsAdmin,
    eventArray,
    setEventArray,
    load,
    setLoad,
  } = useContext(UserContext);
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const [tickets, setTickets] = useState([]);
  const [counter, setCounter] = useState(0);
  const eventDetailsUrl = 'http://localhost:8080/api/v1/events/' + eventId;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(eventDetailsUrl);
        const result = await response.json();
        setEventDetails(result.data);
        setTickets(result.data.seats);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [counter]);
  console.log(eventDetails);
  console.log(tickets);
  const purchaseTicketHandler = async (event) => {
    event.preventDefault();
    console.log('UserId: ' + userId);
    console.log('AccountId: ' + accountId);
    console.log('EventId: ' + eventId);
    if (!userId) {
      navigate('/login');
    } else {
      const ticketAPI = await fetch('http://localhost:8080/api/v1/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: eventId,
          seat: event.target.value,
          accountId: accountId,
        }),
      });
      const response = await ticketAPI.json();
      if (response.message === 'Ticket created') {
        // Trigger update in useEffect
        toast.success(`Ticket Purchase successful!`);
        const newCounter = counter + 1;
        setCounter(newCounter);
      } else {
        toast.error('Failed to purchase ticket')
      }
    }
  };
  const showTickets = tickets.map((seat, index) => {
    console.log(seat);
    return (
      <tr>
        <td>{seat.location}</td>
        <td>{seat.count}</td>
        <td>{seat.price}</td>
        <td>
          <Button onClick={purchaseTicketHandler} value={seat.location}>
            Purchase
          </Button>
        </td>
      </tr>
    );
  });
  return (
    <>
      <h1> {eventDetails.eventName} </h1>
      <img
        src={eventDetails.imageUrl}
        style={{ height: '500px', width: '400px' }}
      ></img>
      <h2> {eventDetails.eventAbout} </h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Location</th>
            <th>Count</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{showTickets}</tbody>
      </Table>
    </>
  );
}

export default EventPage;
