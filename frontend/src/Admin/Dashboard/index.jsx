import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useUser } from '../../userContext';

import axios from '../../axios.config';

import './style.css';

import { FaBars, FaPersonSnowboarding, FaDollarSign, FaDoorOpen } from 'react-icons/fa6';
import { MdForklift } from 'react-icons/md';

export default function AdminDashboard() {
    const navigate = useNavigate();

    const { user, setUser } = useUser();

    const [activeTab, setActiveTab] = React.useState('products');
    const [products, setProducts] = React.useState([]);
    const [sales, setSales] = React.useState([]);

    useEffect(() => {
        if (!user || user.admin !== true) {
            navigate('/');
        }

        const fetchAdminData = async () => {
            try {
                // const productsResponse = await axios.get('/api/admin/products', {
                //     withCredentials: true
                // });
                // setProducts(productsResponse.data);

                // const salesResponse = await axios.get('/api/admin/sales', {
                //     withCredentials: true
                // });
                // setSales(salesResponse.data);

            } catch (error) {
                console.error('Error fetching admin data:', error);
            }
        };

        fetchAdminData();
    }, [user, navigate]);

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
        <div className="admin-dashboard">
            <nav>
                <button className="menu-toggle">
                    <FaBars/>
                </button>

                <div className="tabs">
                    <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
                        <FaPersonSnowboarding />
                    </button>
                    <button className={activeTab === 'sales' ? 'active' : ''} onClick={() => setActiveTab('sales')}>
                        <FaDollarSign />
                    </button>
                    <button className={activeTab === 'inventory' ? 'active' : ''} onClick={() => setActiveTab('inventory')}>
                        <MdForklift />
                    </button>
                </div>

                <button className='logout' onClick={handleLogout}>
                    <FaDoorOpen/>
                </button>
            </nav>
        </div>
    );
}