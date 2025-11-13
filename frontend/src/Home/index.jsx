import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { useUser } from '../userContext';

import axios from '../axios.config';

import './index.css';
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaCartShopping, FaUser, FaBell } from 'react-icons/fa6';
import { MdLogout } from 'react-icons/md';

export default function Home() {
    const navigate = useNavigate();

    const { user, setUser } = useUser();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/client', {
                    withCredentials: true
                });

                setUser(response.data);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchUser();
    }, [setUser]);

    const handleLogout = async () => {
        try {
            await axios.delete('/api/client/logout', {}, {
                withCredentials: true
            });

            setUser(null);
            navigate('/');

        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    return (
        <div className="home">
            <header>
                <h2>Foguete</h2>

                <ul>
                    {user && user.admin === true && (
                        <li className='dashboard'>
                            <Link to="/admin/dashboard">Dashboard</Link>
                        </li>
                    )}
                    <li>
                        <Link to="/about">Sobre</Link>
                    </li>
                    <li>
                        <Link to="/services">Serviços</Link>
                    </li>
                    <li>
                        <Link to="/courses">Cursos</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contato</Link>
                    </li>
                </ul>

                <div className="user">
                    {user ? (
                        <div className="user-info">
                            <p>Olá, <span>{user.name}</span></p>
                            <div className="icons">
                                <Link to="/cart">
                                    <i className='count-wrapper cart'>
                                        <FaCartShopping />
                                        <span className='count' id='cart-count'>0</span>
                                    </i>
                                </Link>
                                <Link to="/profile">
                                    <i className='profile'>
                                        <FaUser />
                                    </i>
                                </Link>
                                <i className='count-wrapper notification'>
                                    <FaBell />
                                    <span className='count' id='notification-count'>0</span>
                                </i>
                                <Link>
                                    <i className='logout' onClick={handleLogout}>
                                        <MdLogout />
                                    </i>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <button className='button btn-alt' onClick={() => navigate('/login')}>Acessar sua conta</button>
                    )}
                </div>
            </header>

            <main>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 7000 }}
                    navigation={true}
                    pagination={{ clickable: true }}
                >
                    <SwiperSlide className='carousel-slide'>
                        <img src="/surf1.jpg" alt="Slide 1" />
                    </SwiperSlide>
                    <SwiperSlide className='carousel-slide'>
                        <img src="/surf2.jpg" alt="Slide 2" />
                    </SwiperSlide>
                    <SwiperSlide className='carousel-slide'>
                        <img src="/surf3.jpg" alt="Slide 3" />
                    </SwiperSlide>
                </Swiper>
                <div className="content">
                    <div className="textual">
                        <h1>Os melhores preços para você</h1>
                    </div>
                </div>
            </main>
        </div>
    );
}