import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import IndividualIntervalsExample from '../components/IndividualIntervalsExample';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Footer from '../components/Footer';
import getLoadData from '../customHooks/GetLoad';
import getEventsData from '../customHooks/GetEvents';
import { useContext, useEffect } from 'react';
import { UserContext } from '../providers/UserProvider';
import EventCard from '../components/EventCards';
import EventCarousel from '../components/EventCarousel';

function AllTicketsPage() {
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
  console.log('User ID: ' + userId);
  console.log('Account ID: ' + accountId);
  console.log('is Admin?' + isAdmin);
  const loadUrl =
    'http://localhost:8080/api/v1/accounts/load/65670dec3c5e1ddebcfec357';
  const eventsUrl = 'http://localhost:8080/api/v1/events?limit=30';
  const getLoad = getLoadData(loadUrl);
  const getEventsArray = getEventsData(eventsUrl);

  // setLoad(getLoad);
  // setEventArray(getEventsArray);

  useEffect(() => {
    setLoad(getLoad);
    setEventArray(getEventsArray);
  }, [getLoad, getEventsArray]);

  const displayEventCard = eventArray
    .sort((obj1, obj2) => new Date(obj1.eventDate) - new Date(obj2.eventDate))
    .map((data, index) => {
      return (
        <EventCard
          key={index}
          title={data.eventName}
          id={data._id}
          venue={data.venue}
          about={data.eventAbout}
          imgUrl={data.imageUrl}
          date={data.eventDate}
        />
      );
    });
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const shuffledArray = shuffleArray([...eventArray]);
  const displayEventCarousel = shuffledArray.map((data, index) => {
    return (
      <EventCarousel
        key={index}
        title={data.eventName}
        id={data._id}
        imgUrl={data.imageUrl}
      />
    );
  });
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <h1 style={{ marginTop: '20px', marginBOttom: '50px' }}>
        {' '}
        Recommended for you
      </h1>
      <div
        style={{ justifyContent: 'center', alignItems: 'center', padding: '0' }}
      >
        <Carousel
          responsive={responsive}
          centerMode={true}
          showDots={true}
          infinite={true}
          keyBoardControl={true}
          // itemClass="carousel-item"
          // containerClass="carousel-container"
          // Add custom styles for the carousel container
          // customTransition="all 0.5s"
          // removeArrowOnDeviceType={['tablet', 'mobile']}
          containerClass="custom-carousel-container"
        >
          {displayEventCarousel}
        </Carousel>

        <h1 style={{ marginTop: '50px', marginBottom: '50px' }}>
          Incoming Events
        </h1>

        <div
          className="event-card-container"
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'left',
          }}
        >
          {displayEventCard}
        </div>

        <div style={{ flex: 1 }}>
          <h1 style={{ marginTop: '50px' }}>Event Venues</h1>

          <div>
            <Container style={{ marginTop: '100px', marginBottom: '100px' }}>
              <IndividualIntervalsExample />
            </Container>
          </div>
          <Footer style={{ marginTop: 'auto', marginBottom: '0' }} />
        </div>
      </div>
    </div>
  );
}
export default AllTicketsPage;
