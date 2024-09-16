import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginRegister from './components/LoginRegister/LoginRegister';
import Expenses from './pages/expenses/expenses';
import NotFound from './pages/NotFound/NotFound';
import DafaultLayout from './components/DefaultLayout/Layout/Layout';

const Router = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <DafaultLayout>
                        <LoginRegister login="login" />
                    </DafaultLayout>
                }
            />
            <Route
                path="/expenses"
                element={
                    <DafaultLayout>
                        <Expenses />
                    </DafaultLayout>
                }
            />
            <Route
                path="/not-found"
                element={
                    <DafaultLayout>
                        <NotFound />
                    </DafaultLayout>
                }
            />

            <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
    );
};

export default Router;
