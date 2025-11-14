import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { UserProvider } from './userContext';

import Home from './Home';

import AuthLayout from './layouts/AuthLayout';
import Login from './Login';
import Register from './Register';

import AdminCheck from './Admin/AdminCheck';
import AdminDashboard from './Admin/Dashboard';
import NewProduct from './Admin/Product/New';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route index element={<Home />} />

          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route element={<AdminCheck />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products/new" element={<NewProduct />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);