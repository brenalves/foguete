import React from 'react';
import { Outlet } from 'react-router-dom';

import './style.css';

export default function AuthLayout() {
    return (
        <div className="auth-layout">
            <header>
                <h2>Foguete</h2>
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