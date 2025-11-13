import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import './style.css';

export default function AuthLayout() {
    return (
        <div className="auth-layout">
            <header>
                <Link to="/" className='title'>Foguete</Link>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <p>&copy; 2025 Foguete. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}