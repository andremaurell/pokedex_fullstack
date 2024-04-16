
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import Card_legendary from '../components/Card_legendary'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import '../App.css';

import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import SwiperCore from 'swiper';

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);


interface Pokemon {
    name: string;
    image: string;
    stats: string[];
    types: string[];
    sprites: {
      front_default: string;
    };
  }
  

const Legendary = () => {
    const [legendaryData, setLegendaryData] = useState<Pokemon[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/legendaries`);
                setLegendaryData(response.data);
                console.log('response', response.data)
            } catch (error) {
                console.error('Error fetching Legendary Pokemon data:', error);
            }
        }
        fetchData();
    }, []);
  return ( 
    <div>
        <div className=' bg-slate-800 h-screen max-h-screen'>
        <Header whoPage = 'Legendaries' />
        <h1 className='flex items-center justify-center py-5 text-4xl font-semibold text-white'>Legendaries</h1>
        <div className='flex items-center justify-center mt-10'>    
        {legendaryData.length > 0 && (
                        <Swiper
                            centeredSlides
                            slidesPerView={3}
                            loop
                            initialSlide={1}
                            pagination
                            navigation
                            className='w-[80vw] h-4/5'
                            effect='coverflow'
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: false,
                            }}
                        >
                            {legendaryData.map((pokemon, index) => (
                                <SwiperSlide key={index}>
                                    <div className='w-80'>
                                        <Card_legendary
                                            name={pokemon.name}
                                            image={pokemon.image}
                                            stats={pokemon.stats}
                                            types={pokemon.types}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
        </div>
        </div>
    </div>
   )
}

export default Legendary