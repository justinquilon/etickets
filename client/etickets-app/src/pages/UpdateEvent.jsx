import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../providers/UserProvider';
import { Form, Button, Container, Table, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const UpdateEvent = () => {
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
  const [errorMessage, setErrorMessage] = useState('');
  let eMessage = '';

  const { eventId } = useParams();
  //   const [eventDetails, setEventDetails] = useState({});
  const [formData, setFormData] = useState({
    userId: userId,
    eventName: '',
    eventAbout: '',
    venue: '',
    imageUrl: '',
    eventDate: '',
    price: 0,
    seats: [
      { location: 'front', count: 0, price: 0 },
      { location: 'center', count: 0, price: 0 },
      { location: 'back', count: 0, price: 0 },
    ],
  });

  useEffect(() => {
    if (!eventId) {
      return;
    }
    loadEvent();
  }, [eventId]);

  const loadEvent = async () => {
    try {
      const data = await fetch(
        `https://server-etickets.onrender.com/api/v1/events/${eventId}`,
        {
          method: 'GET',
        }
      );

      if (!data.ok) {
        throw new Error(`Failed to fetch data. Status: ${data.status}`);
      }

      const response = await data.json();
      console.log(response.data);
      //   setEventDetails(response.data);
      setFormData({
        userId: userId,
        eventName: response.data.eventName,
        eventAbout: response.data.eventAbout,
        venue: response.data.venue,
        imageUrl: response.data.imageUrl,
        eventDate: formatDateString(response.data.eventDate),
        price: response.data.price,
        seats: [...response.data.seats],
      });
    } catch (error) {
      console.error('Error loading event details:', error.message);
    }
  };

  const handleSeatChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedSeats = [...prevData.seats];
      updatedSeats[index] = {
        ...updatedSeats[index],
        [name]: parseInt(value, 10),
      };
      return { ...prevData, seats: updatedSeats };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    try {
      if (
        formData.eventName === '' ||
        formData.eventAbout === '' ||
        formData.venue === ''
      ) {
        eMessage = 'Please fill-up all fields';
        setErrorMessageHandler(eMessage);
      } else {
        eMessage = '';
        setErrorMessage(eMessage);

        // Convert the eventDate to UTC before sending to the database
        const localDate = new Date(formData.eventDate);
        const utcDate = new Date(
          localDate.getTime() - localDate.getTimezoneOffset() * 60000
        );
        formData.eventDate = utcDate.toISOString();

        const data = await fetch(
          `https://server-etickets.onrender.com/api/v1/events/${eventId}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          }
        );

        const response = await data.json();

        if (response.message) {
          toast.success(`Event updated`);
          setFormData({
            userId: userId,
            eventName: '',
            eventAbout: '',
            venue: '',
            imageUrl: '',
            eventDate: '',
            price: 0,
            seats: [
              { location: 'front', count: 0, price: 0 },
              { location: 'center', count: 0, price: 0 },
              { location: 'back', count: 0, price: 0 },
            ],
          });
        } else {
          toast.error(`Unable to update the event`);
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const formatDateString = (dateString) => {
    const formattedDate = new Date(dateString).toISOString().slice(0, 16);
    return formattedDate;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const setErrorMessageHandler = (str) => {
    setErrorMessage(str);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://server-etickets.onrender.com/api/v1/events/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      toast.success('Event deleted');
      setFormData({
        userId: userId,
        eventName: '',
        eventAbout: '',
        venue: '',
        imageUrl: '',
        eventDate: '',
        price: 0,
        seats: [
          { location: 'front', count: 0, price: 0 },
          { location: 'center', count: 0, price: 0 },
          { location: 'back', count: 0, price: 0 },
        ],
      });
    } catch (error) {
      console.error('Error deleting an item:', error.message);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="mt-5">
        <Form.Group controlId="eventName">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter event name"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="eventAbout">
          <Form.Label>Event About</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter event description"
            name="eventAbout"
            value={formData.eventAbout}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="venue">
          <Form.Label>Venue</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter venue"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="imageUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="eventDate">
          <Form.Label>Event Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
          />
        </Form.Group>
        {/* ... (other form fields) */}

        {/* Seats Section */}

        <Form.Group controlId="seats" className="mt-5">
          <Table hover>
            <Form.Label>Location</Form.Label>
            <Row>
              <Col>
                <Form.Label>{`${
                  formData.seats[0].location.charAt(0).toUpperCase() +
                  formData.seats[0].location.slice(1) +
                  ' Seat Count'
                }`}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={`Enter seat count for ${formData.seats[0].location}`}
                  name={`count`}
                  value={formData.seats[0].count}
                  onChange={(e) => handleSeatChange(e, 0)}
                />
              </Col>
              <Col>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={`Enter price for ${formData.seats[0].location}`}
                  name={`price`}
                  value={formData.seats[0].price}
                  onChange={(e) => handleSeatChange(e, 0)}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Label>{`${
                  formData.seats[1].location.charAt(0).toUpperCase() +
                  formData.seats[1].location.slice(1) +
                  ' Seat Count'
                }`}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={`Enter seat count for ${formData.seats[1].location}`}
                  name={`count`}
                  value={formData.seats[1].count}
                  onChange={(e) => handleSeatChange(e, 1)}
                />
              </Col>
              <Col>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={`Enter price for ${formData.seats[1].location}`}
                  name={`price`}
                  value={formData.seats[1].price}
                  onChange={(e) => handleSeatChange(e, 1)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>{`${
                  formData.seats[2].location.charAt(0).toUpperCase() +
                  formData.seats[2].location.slice(1) +
                  ' Seat Count'
                }`}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={`Enter seat count for ${formData.seats[2].location}`}
                  name={`count`}
                  value={formData.seats[2].count}
                  onChange={(e) => handleSeatChange(e, 2)}
                />
              </Col>
              <Col>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={`Enter price for ${formData.seats[2].location}`}
                  name={`price`}
                  value={formData.seats[2].price}
                  onChange={(e) => handleSeatChange(e, 2)}
                />
              </Col>
            </Row>
          </Table>
        </Form.Group>
        <p style={{ color: 'red' }}>{errorMessage ?? ''}</p>
        <Button
          variant="dark"
          type="submit"
          className="mt-3"
          style={{ marginRight: '10px' }}
        >
          Update Event
        </Button>
        <Button
          variant="dark"
          type="button"
          className="mt-3 ml-2"
          onClick={() => handleDelete(eventId)}
        >
          Delete Event
        </Button>
      </Form>
    </Container>
  );
};
export default UpdateEvent;
