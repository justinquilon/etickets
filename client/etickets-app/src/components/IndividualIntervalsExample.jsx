import Carousel from 'react-bootstrap/Carousel';

function IndividualIntervalsExample() {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src="https://gateway-mall-2.aranetacity.com/img/gateway-square/smart-araneta-coliseum/smart-araneta-coliseum.jpg"
          alt="Araneta"
          style={{height:"700px"}}
        />
        <Carousel.Caption>
          <h1 style={{backgroundColor:'rgba(0,0,0,0.2)', width:'500px', margin:'auto'}}>Araneta Coliseum</h1>
          <p>Located in Cubao, Quezon City</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src="https://images.summitmedia-digital.com/topgear/images/2023/08/23/sm-mall-of-asia-arena-2-1692772435.jpg"
          alt="Second slide"
          style={{height:"700px"}}
        />
        <Carousel.Caption>
          <h1 style={{backgroundColor:'rgba(0,0,0,0.7)', width:'500px', margin:'auto'}}>SM Mall of Asia Arena</h1>
          <p>Located in Pasay City</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://globalnation.inquirer.net/files/2014/07/20_INC-arena2.jpg"
          alt="Third slide"
          style={{height:"700px"}}
        />
        <Carousel.Caption>
          <h1 style={{backgroundColor:'rgba(0,0,0,0.2)', width:'500px', margin:'auto'}}>Philippine Arena</h1>
          <p>
            Located in Santa Maria, Bulacan
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default IndividualIntervalsExample;
