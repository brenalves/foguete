import React from 'react';
import { useNavigate, Link } from 'react-router';

import api from '../axios.config';

import './style.css'

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await api.post('/client/login', {
            email,
            password
        });

        if (response.status !== 200) {

            const errorDiv = document.querySelector('.error');
            errorDiv.classList.remove('hidden');
            errorDiv.children[0].innerText = response.data.error || 'Email ou senha inválidos';

            setTimeout(() => {
                errorDiv.classList.add('hidden');
                errorDiv.children[0].innerText = '';
            }, 3000);

            setEmail('');
            setPassword('');
            return;
        }

        navigate('/');
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className="actions">
                    <div className='forgot-password-div'>
                        <Link href="/forgot-password">Esqueceu a senha?</Link>
                    </div>
                    <div>
                        <button className='button' type="submit">Entrar</button>
                        <div className='error hidden'>
                            <p>Email ou senha inválidos</p>
                        </div>
                    </div>
                    <p className='register-link'>Não tem uma conta? <Link to="/register">Registre-se</Link></p>
                </div>
            </form>
        </div>
    );
}