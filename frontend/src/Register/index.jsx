import React from 'react';
import { useNavigate, Link } from 'react-router';

import api from '../axios.config';

import './style.css'

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            const errorDiv = document.querySelector('.error');
            errorDiv.classList.remove('hidden');
            errorDiv.children[0].innerText = 'As senhas não coincidem';

            setTimeout(() => {
                errorDiv.classList.add('hidden');
                errorDiv.children[0].innerText = '';
            }, 3000);

            setPassword('');
            setConfirmPassword('');
            return;
        }

        try {
            const response = await api.post('/client/register', {
                name,
                email,
                password
            });

            navigate('/login');
            
        } catch (error) {
            console.error(error);
            const errorDiv = document.querySelector('.error');
            errorDiv.classList.remove('hidden');
            errorDiv.children[0].innerText = error.response?.data?.error || 'Erro ao registrar';

            setTimeout(() => {
                errorDiv.classList.add('hidden');
                errorDiv.children[0].innerText = '';
            }, 3000);

            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
    }

    return (
        <div className="register">
            <h1>Registrar Conta</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">Nome</label>
                    <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className='input-group'>
                    <label htmlFor="confirm-password">Confirmar Senha</label>
                    <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                </div>
                <div className="actions">
                    <div>
                        <button className='button' type="submit">Criar</button>
                        <div className='error hidden'>
                            <p>Email ou senha inválidos</p>
                        </div>
                    </div>
                    <p className='login-link'>Já tem uma conta? <Link to="/login">Entrar</Link></p>
                </div>
            </form>
        </div>
    );
}