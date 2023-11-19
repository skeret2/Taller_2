import Carousel from 'react-bootstrap/Carousel';


function UncontrolledExample() {
    return (
        <Carousel>
        <Carousel.Item>
            <img src='imagenes/Verduras.jpg'></img>
            
        </Carousel.Item>

        <Carousel.Item>
            <img src='imagenes/Verduras2.jpg'></img>
        </Carousel.Item>

        <Carousel.Item>
            <img src='imagenes/Verduras3.jpg'></img>
        </Carousel.Item>
        </Carousel>
    );
}

export default UncontrolledExample;