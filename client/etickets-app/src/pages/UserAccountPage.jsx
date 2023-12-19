import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../providers/UserProvider';
import { Table, Button } from 'react-bootstrap/';
import getLoadData from '../customHooks/GetLoad';
import TopupModal from '../components/TopupModal';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';

// const formatDate = (dateString) => {
//   const options = { month: 'short', day: 'numeric', year: 'numeric' };
//   const formattedDate = new Date(dateString).toLocaleDateString(
//     'en-US',
//     options
//   );
//   return formattedDate;
// };

const formatDate = (dateString) => {
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedDate = new Date(dateString)
    .toISOString()
    .replace('T', ' ')
    .replace(/\.\d{3}Z$/, '');

  return new Date(formattedDate)
    .toLocaleDateString('en-US', options)
    .replace(',', ' ');
};

const UserAccountPage = () => {
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
  const [tickets, setTickets] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const loadUrl =
    'https://server-etickets.onrender.com/api/v1/accounts/load/' + accountId;
  useEffect(() => {
    if (!accountId) {
      return;
    }
    loadTickets();
    getLoad();
  }, [accountId, load]);

  const getLoad = async () => {
    try {
      const response = await fetch(loadUrl);
      const result = await response.json();
      console.log(response);
      setLoad(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const loadTickets = async () => {
    try {
      const data = await fetch(
        `https://server-etickets.onrender.com/api/v1/tickets/${accountId}`,
        {
          method: 'GET',
        }
      );

      if (!data.ok) {
        throw new Error(`Failed to fetch data. Status: ${data.status}`);
      }

      const response = await data.json();
      console.log(response.data);
      setTickets(response.data);
    } catch (error) {
      console.error('Error loading tasks:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://server-etickets.onrender.com/api/v1/tickets/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountId: accountId,
        }),
      });
      alert('Ticket deleted');
      loadTickets();
    } catch (error) {
      console.error('Error deleting an item:', error.message);
    }
  };

  return (
    <div className="mt-5">
      <h1>MyLoad</h1>
      <h3>Current Load: {load}</h3>
      {accountId ? (
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Topup
        </Button>
      ) : (
        <Button onClick={() => navigate('/login')}>Login to Topup</Button>
      )}
      <TopupModal show={modalShow} onHide={() => setModalShow(false)} />

      <h1 style={{ marginTop: '50px' }}>My Tickets</h1>
      <Fade triggerOnce={true}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Date</th>
              <th>Price</th>
              <th>Venue</th>
              <th>Seat</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((item) => (
              <tr key={item._id}>
                <td>{item.eventName}</td>
                <td>{formatDate(item.eventDate)}</td>
                <td>{item.price}</td>
                <td>{item.venue}</td>
                <td>{item.seat}</td>
                <td>
                  <Button
                    variant="light"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Fade>
    </div>
  );
};

export default UserAccountPage;
