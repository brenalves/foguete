import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useUser } from '../../userContext';

import axios from '../../axios.config';

import './style.css';

import { FaBars, FaBoxesStacked, FaDollarSign, FaTruck, FaDoorClosed, FaDoorOpen } from 'react-icons/fa6';
import { FaSearch, FaPlus, FaPen, FaTrash } from 'react-icons/fa';

export default function AdminDashboard() {
    const navigate = useNavigate();

    const { user, setUser } = useUser();

    const [activeTab, setActiveTab] = React.useState('products');
    const [products, setProducts] = React.useState([]);
    const [sales, setSales] = React.useState([]);

    useEffect(() => {
        console.log('User data:', user);
        if (!user || user.admin !== true) {
            navigate('/');
        }

        const fetchAdminData = async () => {
            try {
                setProducts([
                    {
                        id: 1,
                        name: 'Produto A',
                        code: 'PROD-A',
                        category: 'Categoria A',
                        price: 29.99,
                        stock: 100,
                        active: true,
                        photoUrl: 'https://via.placeholder.com/50'
                    },
                    {
                        id: 2,
                        name: 'Produto B',
                        code: 'PROD-B',
                        category: 'Categoria B',
                        price: 49.99,
                        stock: 50,
                        active: false,
                        photoUrl: 'https://via.placeholder.com/50'
                    },
                    {
                        id: 3,
                        name: 'Produto C',
                        code: 'PROD-C',
                        category: 'Categoria C',
                        price: 19.99,
                        stock: 200,
                        active: true,
                        photoUrl: 'https://via.placeholder.com/50'
                    },
                    {
                        id: 4,
                        name: 'Produto D',
                        code: 'PROD-D',
                        category: 'Categoria A',
                        price: 39.99,
                        stock: 75,
                        active: true,
                        photoUrl: 'https://via.placeholder.com/50'
                    },
                    {
                        id: 5,
                        name: 'Produto E',
                        code: 'PROD-E',
                        category: 'Categoria B',
                        price: 59.99,
                        stock: 30,
                        active: false,
                        photoUrl: 'https://via.placeholder.com/50'
                    },
                    {
                        id: 6,
                        name: 'Produto F',
                        code: 'PROD-F',
                        category: 'Categoria C',
                        price: 24.99,
                        stock: 150,
                        active: true,
                        photoUrl: 'https://via.placeholder.com/50'
                    },
                    {
                        id: 7,
                        name: 'Produto G',
                        code: 'PROD-G',
                        category: 'Categoria A',
                        price: 44.99,
                        stock: 60,
                        active: true,
                        photoUrl: 'https://via.placeholder.com/50'
                    },
                    {
                        id: 8,
                        name: 'Produto H',
                        code: 'PROD-H',
                        category: 'Categoria B',
                        price: 34.99,
                        stock: 80,
                        active: false,
                        photoUrl: 'https://via.placeholder.com/50'
                    },
                    {
                        id: 9,
                        name: 'Produto I',
                        code: 'PROD-I',
                        category: 'Categoria C',
                        price: 27.99,
                        stock: 120,
                        active: true,
                        photoUrl: 'https://via.placeholder.com/50'
                    },
                    {
                        id: 10,
                        name: 'Produto J',
                        code: 'PROD-J',
                        category: 'Categoria A',
                        price: 54.99,
                        stock: 40,
                        active: true,
                        photoUrl: 'https://via.placeholder.com/50'
                    }
                ]);
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
                    <FaBars />
                </button>

                <div className="tabs">
                    <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
                        <FaBoxesStacked />
                    </button>
                    <button className={activeTab === 'sales' ? 'active' : ''} onClick={() => setActiveTab('sales')}>
                        <FaDollarSign />
                    </button>
                    <button className={activeTab === 'inventory' ? 'active' : ''} onClick={() => setActiveTab('inventory')}>
                        <FaTruck />
                    </button>
                </div>

                <button className='logout' onClick={handleLogout} onMouseEnter={(e) => {
                    e.currentTarget.classList.add('hovered');
                }} onMouseLeave={(e) => {
                    e.currentTarget.classList.remove('hovered');
                }}>
                    <i className='close-icon'>
                        <FaDoorClosed />
                    </i>
                    <i className='open-icon'>
                        <FaDoorOpen />
                    </i>
                </button>
            </nav>
            <main className="admin-content">
                {activeTab === 'products' && (
                    <section className="products-section">
                        <h1 className='title'>Gerenciamento de Produtos</h1>
                        <div className="content">
                            <div className="analytics-dashboard">
                                <div className="analytics-card">
                                    <h3>Total de Produtos</h3>
                                    <p>{products.length}</p>
                                </div>
                                <div className="analytics-card">
                                    <h3>Produtos Ativos</h3>
                                    <p>{products.filter(p => p.active).length}</p>
                                </div>
                                <div className="analytics-card">
                                    <h3>Produtos Inativos</h3>
                                    <p>{products.filter(p => !p.active).length}</p>
                                </div>
                            </div>

                            <header className="section-header">
                                <h2>Produtos</h2>
                                <div className="actions">
                                    <button className="add-product-button">
                                        <FaPlus /> Adicionar Produto</button>
                                    <div className="input">
                                        <FaSearch />
                                        <input type="text" placeholder="Buscar produtos..." />
                                    </div>
                                </div>
                            </header>
                            <main>
                                <div className="product-list">
                                    <header className="product-list-header">
                                        <span>Foto</span>
                                        <span>Nome</span>
                                        <span>Código</span>
                                        <span>Categoria</span>
                                        <span>Preço</span>
                                        <span>Estoque</span>
                                        <span>Status</span>
                                        <span>Ações</span>
                                    </header>
                                    <div className="product-content">
                                        {(products.length === 0) ? (
                                            <p>Nenhum produto encontrado.</p>
                                        ) : (
                                            products.map((product) => (
                                                <div className="product-item" key={product.id}>
                                                    <span className="product-photo">
                                                        <img src={product.photoUrl} alt={product.name} />
                                                    </span>
                                                    <span className="product-name">{product.name}</span>
                                                    <span className="product-code">{product.code}</span>
                                                    <span className="product-category">{product.category}</span>
                                                    <span className="product-price">R${product.price.toFixed(2)}</span>
                                                    <span className="product-stock">{product.stock}</span>
                                                    <span className="product-status">{product.active ? 'Ativo' : 'Inativo'}</span>
                                                    <span className="product-actions">
                                                        <button className="edit-button">
                                                            <FaPen />
                                                        </button>
                                                        <button className="delete-button">
                                                            <FaTrash />
                                                        </button>
                                                    </span>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                                <div className="filter">
                                    <h3>Filtros</h3>
                                    <header className='filter-options'>
                                        <span>Categoria</span>
                                        <span>Preço</span>
                                        <span>Estoque</span>
                                        <span>Status</span>
                                    </header>
                                    <main className='filter-content'>
                                        <div className="filter-category">
                                            <select name="filter-category" id="filter-category">
                                                <option value="">Todas as Categorias</option>
                                                <option value="categoria-a">Categoria A</option>
                                                <option value="categoria-b">Categoria B</option>
                                                <option value="categoria-c">Categoria C</option>
                                            </select>
                                        </div>
                                        <div className="filter-price-range">
                                            <input type="number" placeholder="Preço Mínimo" />
                                            <input type="number" placeholder="Preço Máximo" />
                                        </div>
                                        <div className="filter-stock-status">
                                            <select name="filter-stock-status" id="filter-stock-status">
                                                <option value="">Todos os Estoques</option>
                                                <option value="in-stock">Em Estoque</option>
                                                <option value="out-of-stock">Fora de Estoque</option>
                                            </select>
                                        </div>
                                        <div className="filter-active-status">
                                            <select name="filter-active-status" id="filter-active-status">
                                                <option value="">Todos os Status</option>
                                                <option value="active">Ativo</option>
                                                <option value="inactive">Inativo</option>
                                            </select>
                                        </div>
                                    </main>
                                </div>
                            </main>
                        </div>
                    </section>
                )}
                {activeTab === 'sales' && (
                    <section className="sales-section">
                        <h2>Sales Analytics</h2>
                        {/* Sales analytics content goes here */}
                    </section>
                )}
                {activeTab === 'inventory' && (
                    <section className="inventory-section">
                        <h2>Inventory Tracking</h2>
                        {/* Inventory tracking content goes here */}
                    </section>
                )}
            </main>
        </div >
    );
}