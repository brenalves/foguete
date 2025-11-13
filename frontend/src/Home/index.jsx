import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from '../axios.config';

import './index.css';

export default function Home() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

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
    }, []);

    return (
        <div className="home">
            <header>
                <h2>Foguete</h2>

                <ul>
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
                        <>
                            <span>Welcome, {user.name}!</span>
                            <button onClick={async () => {
                                try {
                                    await axios.delete('/api/client/logout', { withCredentials: true });
                                    setUser(null);
                                    navigate('/login');
                                } catch (error) {
                                    console.error('Error logging out:', error);
                                }
                            }}>Logout</button>
                        </>
                    ) : (
                        <button className='button btn-alt' onClick={() => navigate('/login')}>Acessar sua conta</button>
                    )}
                </div>
            </header>
        </div>
    );
}