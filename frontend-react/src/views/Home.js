import React from 'react'
import UncontrolledExample from '../components/Carrusel';

const Home = () => {
    return (
        <>
        <div className='home'>
            <h1>¡Bienvenido a Dumbo!</h1>
            <p>En Dumbo encontrarás una gran variedad de productos de la mejor calidad. ¡No te lo pierdas!</p>

            <UncontrolledExample/>
        </div>

        <div className='home-info'> </div>

        </>
        
    )
}

export default Home
