import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Table from 'react-bootstrap/Table';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../providers/UserProvider';

function EventFilter() {
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

  const [eventName, setEventName] = useState('');
  const [exactDate, setExactDate] = useState(dayjs());
  const [initialDate, setInitialDate] = useState(dayjs());
  const [finalDate, setFinalDate] = useState(dayjs());
  const [eventsFiltered, setEventsFiltered] = useState([]);

  console.log(initialDate.format('YYYY-MM-DD'));
  console.log(finalDate.format('YYYY-MM-DD'));
  console.log(exactDate.format('YYYY-MM-DD'));
  console.log(eventsFiltered);
  const filterByNameUrl =
    'https://server-etickets.onrender.com/api/v1/events/find/name/' + eventName;
  const filterByDate =
    'https://server-etickets.onrender.com/api/v1/events/find/date/' +
    exactDate.format('YYYY-MM-DD');
  const filterByDateRange =
    'https://server-etickets.onrender.com/api/v1/events/find/date-range/' +
    initialDate.format('YYYY-MM-DD') +
    '/' +
    finalDate.format('YYYY-MM-DD');
  const submitNameHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(filterByNameUrl);
    const result = await response.json();
    setEventsFiltered(result.data);
  };
  const submitExactDateHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(filterByDate);
    const result = await response.json();
    setEventsFiltered(result.data);
  };
  const submitDateRangeHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(filterByDateRange);
    const result = await response.json();
    setEventsFiltered(result.data);
  };
  const eventButtonHandler = (event) => {
    console.log();
    navigate('/event/' + event.target.value);
  };
  const updateEventButtonHandler = (event) => {
    console.log();
    navigate('/event/update-event/' + event.target.value);
  };

  const navigate = useNavigate();
  const showFilteredEvents = eventsFiltered.map((event, index) => {
    return (
      <>
        <tr>
          <td>{event.eventName}</td>
          <td>{event.venue}</td>
          <td>{dayjs(event.eventDate.slice(0, -2)).format('MMMM DD, YYYY')}</td>
          <td>
            <Button value={event._id} onClick={eventButtonHandler}>
              Buy Tickets
            </Button>
          </td>
          {isAdmin && (
            <td>
              <Button
                value={event._id}
                onClick={updateEventButtonHandler}
                style={{ whiteSpace: 'nowrap', display: 'inline-block' }}
              >
                Update Event
              </Button>
            </td>
          )}
        </tr>
      </>
    );
  });
  return (
    <>
      <h1 style={{ marginTop: '50px', marginBottom: '50px' }}>Custom Filter</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Accordion defaultActiveKey="0" style={{ width: '400px' }}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Filter By Name</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formEventName">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Event Name"
                      value={eventName}
                      onChange={(newValue) =>
                        setEventName(newValue.target.value)
                      }
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    onClick={submitNameHandler}
                  >
                    Submit
                  </Button>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Filter By Date</Accordion.Header>
              <Accordion.Body>
                <Form
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Form.Group className="mb-3" controlId="formDate">
                    <Form.Label>Exact Date</Form.Label>
                  </Form.Group>
                  <DatePicker
                    label="Filter By Date"
                    value={exactDate}
                    onChange={(newValue) => setExactDate(newValue)}
                  />
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={submitExactDateHandler}
                  >
                    Submit
                  </Button>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Filter By Date Range</Accordion.Header>
              <Accordion.Body>
                <Form
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Form.Group className="mb-3" controlId="initialDate">
                    <Form.Label>Initial Date</Form.Label>
                  </Form.Group>
                  <DatePicker
                    label="Filter By Date"
                    value={initialDate}
                    onChange={(newValue) => setInitialDate(newValue)}
                  />
                  <Form.Group className="mb-3" controlId="finalDate">
                    <Form.Label>Final Date</Form.Label>
                  </Form.Group>
                  <DatePicker
                    label="Filter By Date"
                    value={finalDate}
                    onChange={(newValue) => setFinalDate(newValue)}
                  />
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={submitDateRangeHandler}
                  >
                    Submit
                  </Button>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </LocalizationProvider>
      </div>
      <div style={{ marginTop: '50px' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Venue</th>
              <th>Date</th>
              <th> </th>
              {isAdmin && <th> </th>}
            </tr>
          </thead>
          <tbody>{showFilteredEvents}</tbody>
        </Table>
      </div>
    </>
  );
}

export default EventFilter;
