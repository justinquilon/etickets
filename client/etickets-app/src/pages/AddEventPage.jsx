import { useState, useContext } from 'react';
import { UserContext } from '../providers/UserProvider';
import { Form, Button, Container, Table, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
const AddEventPage = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
          `https://server-etickets.onrender.com/api/v1/events/`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          }
        );

        const response = await data.json();

        if (response.message) {
          toast.success(`New event added`);
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
          toast.error(`Unable to add an event`);
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const setErrorMessageHandler = (str) => {
    setErrorMessage(str);
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
        <Button variant="dark" type="submit" className="mt-3">
          Create Event
        </Button>
      </Form>
    </Container>
  );
};

export default AddEventPage;
