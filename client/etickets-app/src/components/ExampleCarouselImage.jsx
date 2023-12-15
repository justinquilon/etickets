import { Carousel } from 'react-bootstrap';

function ExampleCarouselImage() {
  return (
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://images.pexels.com/photos/19031635/pexels-photo-19031635/free-photo-of-a-window-with-a-reflection-of-trees-and-water.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      <Carousel.Caption>
        <h3>slide text</h3>
        <p>{/* Additional text if needed */}</p>
      </Carousel.Caption>
    </Carousel.Item>
  );
}

export default ExampleCarouselImage;
