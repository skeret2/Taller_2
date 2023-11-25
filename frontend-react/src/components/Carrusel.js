import Carousel from 'react-bootstrap/Carousel';


function UncontrolledExample() {
    return (
        // componente de carrusel de bootstrap para mostrar las imagenes en el home
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